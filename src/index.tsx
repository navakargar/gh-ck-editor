import React from "react";
import { createRoot } from 'react-dom/client';
import CKEditorComponent, { ICKEditorComponentProps } from "./CKEditor/CKEditorComponent";
import HtmlPreviewComponent, { IHtmlPreviewComponentProps } from "./HtmlPreview/HtmlPreviewComponent";

// Development app component
const App: React.FC = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const ErrorComponent: React.FC<{ text: string }> = ({ text }) => <p style={{ color: "red" }}>{text}</p>
  const TitleComponent: React.FC<{ text: string }> = ({ text }) => <p style={{ color: "gray" }}>{text}</p>
  const HelperTextComponent: React.FC<{ text: string }> = ({ text }) => <p style={{ color: "yellow" }}>{text}</p>
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <CKEditorComponent
        value={value}
        onChangeValue={handleChange}
        injectionText="hi"
        error={true}
        helperText="Helper Text"
        HelperTextComponent={HelperTextComponent}
        title="Title"
        // TitleComponent={TitleComponent}
        // ResetWrapper={}
        // toolbar={['heading', '|', 'bold']}
        heading={[{
          model: 'heading1' as const,
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        }]}
        fontFamily={['Arial, Helvetica, sans-serif', 'Courier New, Courier, monospace', 'Georgia, serif',]}
        fontSize={['tiny', 'small']}
        disabled={false}
        isRequired
        style={{ fontFamily: "Helvetica, sans-serif", fontSize: "50px" }}
        className=""
      />
      <HtmlPreviewComponent html={value} />
    </div>
  );
};

// Render the app for development
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}

// Export the component for library use
const CKEditor: React.FC<ICKEditorComponentProps> = (props: ICKEditorComponentProps) => {
  const { value,
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
    className } = props;

  return (
    <>
      <CKEditorComponent
        value={value}
        onChangeValue={onChangeValue}
        injectionText={injectionText}
        error={error}
        helperText={helperText}
        HelperTextComponent={HelperTextComponent}
        title={title}
        TitleComponent={TitleComponent}
        ResetWrapper={ResetWrapper}
        LimitCharacterComponent={LimitCharacterComponent}
        toolbar={toolbar}
        heading={heading}
        fontFamily={fontFamily}
        fontSize={fontSize}
        disabled={disabled}
        isRequired={isRequired}
        style={style}
        className={className}
      />
    </>
  );
};

export default CKEditor;
export type { ICKEditorComponentProps };

const HtmlPreview: React.FC<IHtmlPreviewComponentProps> = (props: IHtmlPreviewComponentProps) => {
  const { html } = props;

  return (
    <>
      <HtmlPreviewComponent html={html} />
    </>
  );
};

export { HtmlPreview };
export type { IHtmlPreviewComponentProps };