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

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>CKEditor React Component Demo</h1>
      <CKEditorComponent
        value={value}
        onChangeValue={handleChange}
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
  const { value, onChangeValue, injectionText, error, ErrorComponent, ResetWrapper, toolbar, disabled } = props;

  return (
    <>
      <CKEditorComponent
        value={value}
        onChangeValue={onChangeValue}
        injectionText={injectionText}
        error={error}
        ErrorComponent={ErrorComponent}
        ResetWrapper={ResetWrapper}
        toolbar={toolbar}
        disabled={disabled}
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