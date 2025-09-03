📄 CKEditorComponent Documentation

A reusable wrapper around @ckeditor/ckeditor5-react
 with custom configuration, headings, fonts, error handling, and helper text support.

✨ Features

Built-in toolbar, heading, font family & font size defaults

Supports injecting custom text programmatically

Customizable special characters menu

Validation & error display (error, helperText)

Fully controlled input (value, onChangeValue)

Extensible with custom wrapper, title, and helper text components

🔧 Props
Required
Prop	Type	Description
value	string	Current editor content (HTML string).
onChangeValue	(value: string) => void	Callback triggered when editor content changes.
Optional
Prop	Type	Description
injectionText	string	Text to insert into the editor programmatically.
error	boolean	If true, highlights the editor with an error state.
helperText	string	Helper/error text displayed under the editor.
HelperTextComponent	JSXElementConstructor<any>	Custom component to render helperText.
title	string	Title/label displayed above the editor.
TitleComponent	JSXElementConstructor<any>	Custom component to render title.
ResetWrapper	JSXElementConstructor<any>	Wrapper component around the editor (useful for styling or reset functionality).
toolbar	string[]	Custom toolbar configuration (defaults provided).
heading	IHeading[]	Custom heading options (h1–h4, p by default).
fontFamily	string[]	Custom font families.
fontSize	string[]	Custom font sizes.
disabled	boolean	Disables the editor when true.
isRequired	boolean	Appends an asterisk (*) to the title when true.
style	CSSProperties	Inline style for the container.
className	string	CSS class for the container.
🏗️ Types
IHeading
interface IHeading {
  model: 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'paragraph';
  view: string;
  title: string;
  class: string;
}

⚙️ Default Configurations
Default Toolbar
const defaultToolbar: string[] = [
  'heading', '|',
  'bold', 'italic', 'underline', 'strikethrough',
  'fontSize', 'fontColor', 'fontFamily', 'specialCharacters', '|',
  'blockQuote', 'outdent', 'indent', 'alignment', '|',
  'bulletedList', 'numberedList', '|',
  'undo', 'redo', '|',
  'removeFormat', 'selectAll', 'accessibilityHelp'
];

Default Headings
const defaultHeading: IHeading[] = [
  { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
  { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
  { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
  { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
  { model: 'paragraph', view: 'p', title: 'Paragraph', class: 'ck-heading_paragraph' }
];

Default Fonts
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
];
const defaultFontSize: string[] = ['tiny', 'small', 'default', 'big', 'huge'];

🖊️ Special Characters Plugin

Adds a Custom group of characters to the specialCharacters menu:

© Copyright

® Registered Trademark

™ Trademark

€ Euro Sign

£ Pound Sign

¥ Yen Sign

• Bullet Point

— Em Dash

± Plus-Minus

∞ Infinity


✅ Notes

The component is controlled, meaning value and onChangeValue must be provided.

If you need to insert content dynamically, pass a string to injectionText.
