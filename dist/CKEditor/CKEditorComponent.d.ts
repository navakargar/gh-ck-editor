import { JSXElementConstructor } from 'react';
import './CKEditor.css';
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
declare const CKEditorComponent: (props: ICKEditorComponentProps) => import("react/jsx-runtime").JSX.Element;
export default CKEditorComponent;
