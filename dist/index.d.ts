import React from "react";
import { ICKEditorComponentProps } from "./CKEditor/CKEditorComponent";
import { IHtmlPreviewComponentProps } from "./HtmlPreview/HtmlPreviewComponent";
declare const CKEditor: React.FC<ICKEditorComponentProps>;
export default CKEditor;
export type { ICKEditorComponentProps };
declare const HtmlPreview: React.FC<IHtmlPreviewComponentProps>;
export { HtmlPreview };
export type { IHtmlPreviewComponentProps };
