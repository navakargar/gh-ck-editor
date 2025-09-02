import React, { JSXElementConstructor, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomEditor from 'ckeditor5-custom-build';
import './CKEditor.css';

const defaultToolbar: string[] = [
  'heading',
  '|',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'fontSize',
  'fontColor',
  'fontFamily',
  'specialCharacters',
  '|',
  'blockQuote',
  'outdent',
  'indent',
  'alignment',
  '|',
  'bulletedList',
  'numberedList',
  '|',
  'undo',
  'redo',
  '|',
  'removeFormat',
  'selectAll',
  'accessibilityHelp',
];

const uploadFileExts: string[] = ['.pdf', '.doc', '.docx', '.xls', '.xlsx'];
const imageUploadExts: string[] = ['mpeg', 'jpg', 'png', 'jpeg'];

export interface ICKEditorComponentProps {
  value: string;
  onChangeValue: (value: string) => void;
  injectionText?: string;
  error?: string;
  ErrorComponent?: JSXElementConstructor<any>;
  title?: string;
  TitleComponent?: JSXElementConstructor<any>;
  ResetWrapper?: JSXElementConstructor<any>;
  toolbar?: string[];
  disabled?: boolean;
}
const CKEditorComponent = (props: ICKEditorComponentProps) => {
  const {
    value,
    onChangeValue,
    injectionText,
    error,
    ErrorComponent,
    title,
    TitleComponent,
    ResetWrapper,
    toolbar,
    disabled
  } = props;

  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef && editorRef?.current && injectionText) {
      const editor = (editorRef?.current as any)?.editor;
      editor?.model?.change((writer: any) => {
        const insertPosition =
          editor.model.document.selection.getFirstPosition();
        writer.insertText(`{{${injectionText}}}`, insertPosition);
      });
    }
  }, [injectionText]);

  const editorConfiguration = {
    licenseKey: "GPL",
    extraPlugins: [uploadPlugin, specialCharacterPlugin],
    toolbar: {
      items: toolbar ?? defaultToolbar,
      shouldNotGroupWhenFull: false,
    },
    heading: {
      options: [
        {
          model: 'heading1' as const,
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2' as const,
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3' as const,
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4' as const,
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4',
        },
        {
          model: 'paragraph' as const,
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
      ],
    },

    simpleUpload: {
      uploadUrl: `https://sample.com/files/editor`, //TODO: change it to real url
      fileTypes: uploadFileExts,
    },
    image: {
      upload: { types: imageUploadExts },
    },
  };
  const Wrapper = ResetWrapper ?? 'div';

  return (
    <>
      <Wrapper className='mt-3'>
        {TitleComponent && title ? <TitleComponent title={title} /> : <p>{title}</p>}
        <CKEditor
          ref={editorRef}
          editor={CustomEditor as any}
          config={editorConfiguration}
          data={value}
          onChange={(event, editor) => {
            onChangeValue(editor.getData());
          }}
          disabled={disabled}
        />
      </Wrapper>
      {ErrorComponent && error ? <ErrorComponent err={error} /> : <p>{error}</p>}
    </>
  );
};

export default CKEditorComponent;

// upload Adaptor
// TODO: add type to variables - implement uploading when it needed

// upload Adaptor
function uploadAdapter(loader: { file: Promise<any>; }) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        // const fd = new FormData();
        loader.file.then(file => {
          // TODO:here check the mimetype and send request to relevant backend api endpoint
          // axios
          //   .post(`https://sample.com/files/${endPoint}`, fd)
          //   .then((res) => {
          //     resolve({
          //       default: res.data[0].fileAddress
          //     })
          //   })
          //   .catch((err) => {
          //     reject(err)
          //   })
        });
      });
    },
  };
}

function uploadPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: { file: Promise<any>; }) => {
    return uploadAdapter(loader);
  };

  // when upload completes, replace tag
  const imageUploadEditing = editor.plugins.get('ImageUploadEditing');
  imageUploadEditing.on('uploadComplete', (evt: { stop: () => void; }, { data }: any) => {
    editor.model.change(() => {
      const view = editor.data.processor.toView(
        data.mediaType === 'video'
          ? `<video src='${data.default}' controls="controls"></video>`
          : data.mediaType === 'audio'
            ? `<audio src='${data.default}' controls="controls"></audio>`
            : `<img src='${data.default}' />`,
      );
      const model = editor.data.toModel(view);
      editor.model.insertContent(model, editor.model.document.selection);
    });

    evt.stop();
    editor.editing.view.focus();
  });
}

function specialCharacterPlugin(editor: any) {
  editor.plugins.get('SpecialCharacters').addItems('Custom', [
    { character: '©', title: 'Copyright' },
    { character: '®', title: 'Registered Trademark' },
    { character: '™', title: 'Trademark' },
    { character: '€', title: 'Euro Sign' },
    { character: '£', title: 'Pound Sign' },
    { character: '¥', title: 'Yen Sign' },
    { character: '•', title: 'Bullet Point' },
    { character: '—', title: 'Em Dash' },
    { character: '±', title: 'Plus-Minus' },
    { character: '∞', title: 'Infinity' },
  ]);
}
