import { CSSProperties, JSXElementConstructor, useEffect, useMemo, useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomEditor from 'gh-ckeditor5-custom-build';
import './CKEditor.css';
import Editor from 'gh-ckeditor5-custom-build';

interface IHeading {
  model: 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'paragraph',
  view: string,
  title: string,
  class: string,
}
export interface ICKEditorComponentProps {
  value: string;
  onChangeValue: (value: string) => void;
  injectionText?: string;
  error?: boolean;
  helperText?: string;
  HelperTextComponent?: JSXElementConstructor<any>;
  title?: string;
  TitleComponent?: JSXElementConstructor<any>;
  ResetWrapper?: JSXElementConstructor<any>;
  LimitCharacterComponent?: JSXElementConstructor<any>;
  toolbar?: string[];
  heading?: IHeading[],
  fontFamily?: string[];
  fontSize?: string[];
  disabled?: boolean;
  isRequired?: boolean;
  style?: CSSProperties;
  className?: string;
}

const CKEditorComponent = (props: ICKEditorComponentProps) => {
  const {
    value,
    onChangeValue,
    injectionText,
    error,
    helperText,
    HelperTextComponent,
    title,
    TitleComponent,
    ResetWrapper,
    LimitCharacterComponent,
    toolbar,
    heading,
    fontFamily,
    fontSize,
    disabled,
    isRequired,
    style,
    className
  } = props;

  const editorRef = useRef(null);
  const [initialValue, setInitialValue] = useState<string>();

  useEffect(() => {
    if (!initialValue || !value) {
      setInitialValue(value);
    }
  }, [value, initialValue]);

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
    extraPlugins: [specialCharacterPlugin],
    toolbar: {
      items: toolbar ?? defaultToolbar,
      shouldNotGroupWhenFull: false,
    },
    heading: {
      options: heading ?? defaultHeading,
    },
    fontFamily: {
      options: fontFamily ?? defaultFontFamily,
      supportAllValues: true
    },
    fontSize: {
      options: fontSize ?? defaultFontSize,
    },
    link: {
      defaultProtocol: 'https://',
    },
  };
  const Wrapper = ResetWrapper ?? 'div';

  return (
    <div style={style} className={className}>

      {title && <p style={{ color: error ? "red" : "" }}>{title}{isRequired && "*"}</p>}
      {TitleComponent && !title && <TitleComponent />}

      <Wrapper style={{ border: error ? "0.5px solid red" : "" }}>
        <CKEditor
          ref={editorRef}
          editor={CustomEditor as any}
          config={editorConfiguration}
          data={initialValue}
          onChange={(event, editor) => {
            onChangeValue(addStyles(editor.getData()));
          }}
          disabled={disabled}
        />
      </Wrapper >

      <div className='flex-between'>
        <div>
          {error && helperText && <p>{helperText}</p>}
          {error && HelperTextComponent && !helperText && <HelperTextComponent />}
        </div>
        {LimitCharacterComponent && <LimitCharacterComponent />}
      </div>
    </div>
  );
};

export default CKEditorComponent;

function addStyles(htmlString: string) {
  const stylesMap = {
    ol: ["decimal", "lower-latin", "lower-roman", "upper-latin", "upper-roman"],
    ul: ["disc", "circle", "square"]
  };

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  function setListStyles(list: Element, level = 1) {
    const tag = list.tagName.toLowerCase();
    const styles = stylesMap[tag as keyof typeof stylesMap];
    if (!styles) return;

    const style = styles[level - 1] || styles[styles.length - 1];

    if (style) {
      const currentStyle = list.getAttribute("style") || "";
      if (!/list-style-type\s*:/i.test(currentStyle)) {
        list.setAttribute(
          "style",
          (currentStyle.trim() ? currentStyle.trim() + " " : "") + `list-style-type:${style};`
        );
      }
    }

    list.querySelectorAll(":scope > li > ol, :scope > li > ul").forEach(childList => {
      setListStyles(childList, level + 1);
    });
  }

  doc.querySelectorAll("ol, ul").forEach(list => {
    setListStyles(list, 1);
  });

  doc.querySelectorAll("a").forEach(a => {
    a.setAttribute("target", "_blank");
  });

  return doc.body.innerHTML.trim();
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
  'link',
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
const defaultHeading: IHeading[] = [
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
    view: 'p',
    title: 'Paragraph',
    class: 'ck-heading_paragraph',
  },
]
const defaultFontFamily: string[] = [
  'default',
  'Arial, Helvetica, sans-serif',
  'Courier New, Courier, monospace',
  'Georgia, serif',
  'Lucida Sans Unicode, Lucida Grande, sans-serif',
  'Tahoma, Geneva, sans-serif',
  'Times New Roman, Times, serif',
  'Trebuchet MS, Helvetica, sans-serif',
  'Verdana, Geneva, sans-serif',
  'Roboto, sans-serif'
]
const defaultFontSize: string[] = ['tiny', 'small', 'default', 'big', 'huge']