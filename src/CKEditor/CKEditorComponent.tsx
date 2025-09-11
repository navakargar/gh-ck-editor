import React, {
  CSSProperties,
  JSXElementConstructor,
  useEffect,
  useRef,
} from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from "gh-ckeditor5-custom-build";

interface IHeading {
  model: "heading1" | "heading2" | "heading3" | "heading4" | "paragraph";
  view: string;
  title: string;
  class: string;
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
  toolbar?: string[];
  heading?: IHeading[];
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
    toolbar,
    heading,
    fontFamily,
    fontSize,
    disabled,
    isRequired,
    style,
    className,
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
      supportAllValues: true,
    },
    fontSize: {
      options: fontSize ?? defaultFontSize,
    },
  };
  const Wrapper = ResetWrapper ?? "div";

  return (
    <div style={style} className={className}>
      {title && (
        <p style={{ color: error ? "red" : "" }}>
          {title}
          {isRequired && "*"}
        </p>
      )}
      {TitleComponent && !title && <TitleComponent />}

      <Wrapper style={{ border: error ? "0.5px solid red" : "" }}>
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

      {error && helperText && <p>{helperText}</p>}
      {error && HelperTextComponent && !helperText && <HelperTextComponent />}
    </div>
  );
};

export default CKEditorComponent;

function specialCharacterPlugin(editor: any) {
  editor.plugins.get("SpecialCharacters").addItems("Custom", [
    { character: "©", title: "Copyright" },
    { character: "®", title: "Registered Trademark" },
    { character: "™", title: "Trademark" },
    { character: "€", title: "Euro Sign" },
    { character: "£", title: "Pound Sign" },
    { character: "¥", title: "Yen Sign" },
    { character: "•", title: "Bullet Point" },
    { character: "—", title: "Em Dash" },
    { character: "±", title: "Plus-Minus" },
    { character: "∞", title: "Infinity" },
  ]);
}
const defaultToolbar: string[] = [
  "heading",
  "|",
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "fontSize",
  "fontColor",
  "fontFamily",
  "specialCharacters",
  "|",
  "blockQuote",
  "outdent",
  "indent",
  "alignment",
  "|",
  "bulletedList",
  "numberedList",
  "|",
  "undo",
  "redo",
  "|",
  "removeFormat",
  "selectAll",
  "accessibilityHelp",
];
const defaultHeading: IHeading[] = [
  {
    model: "heading1" as const,
    view: "h1",
    title: "Heading 1",
    class: "ck-heading_heading1",
  },
  {
    model: "heading2" as const,
    view: "h2",
    title: "Heading 2",
    class: "ck-heading_heading2",
  },
  {
    model: "heading3" as const,
    view: "h3",
    title: "Heading 3",
    class: "ck-heading_heading3",
  },
  {
    model: "heading4" as const,
    view: "h4",
    title: "Heading 4",
    class: "ck-heading_heading4",
  },
  {
    model: "paragraph" as const,
    view: "p",
    title: "Paragraph",
    class: "ck-heading_paragraph",
  },
];
const defaultFontFamily: string[] = [
  "default",
  "Arial, Helvetica, sans-serif",
  "Courier New, Courier, monospace",
  "Georgia, serif",
  "Lucida Sans Unicode, Lucida Grande, sans-serif",
  "Tahoma, Geneva, sans-serif",
  "Times New Roman, Times, serif",
  "Trebuchet MS, Helvetica, sans-serif",
  "Verdana, Geneva, sans-serif",
  "Roboto, sans-serif",
];
const defaultFontSize: string[] = ["tiny", "small", "default", "big", "huge"];
