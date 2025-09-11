# Usage Guide for gh-ck-editor

This package is compatible with both Webpack and Turbopack in Next.js projects.

## Installation

```bash
npm install gh-ck-editor
# or
yarn add gh-ck-editor
# or
pnpm add gh-ck-editor
```

## Usage

### Basic Usage

```jsx
import CKEditor, { HtmlPreview } from "gh-ck-editor";
import "gh-ck-editor/styles.css"; // Import the CSS styles

function MyComponent() {
  const [value, setValue] = useState("");

  return (
    <div>
      <CKEditor
        value={value}
        onChangeValue={setValue}
        title="My Editor"
        isRequired
      />
      <HtmlPreview html={value} />
    </div>
  );
}
```

### Next.js with Webpack

In your Next.js project using Webpack (default), the package will work out of the box:

```jsx
// pages/editor.js or app/editor/page.js
import { useState } from "react";
import CKEditor, { HtmlPreview } from "gh-ck-editor";
import "gh-ck-editor/styles.css";

export default function EditorPage() {
  const [content, setContent] = useState("");

  return (
    <div>
      <h1>My Editor</h1>
      <CKEditor
        value={content}
        onChangeValue={setContent}
        title="Content Editor"
      />
      <HtmlPreview html={content} />
    </div>
  );
}
```

### Next.js with Turbopack

When using Turbopack (Next.js 13+ with `--turbo` flag), the package will automatically use the ESM build:

```jsx
// app/editor/page.js
"use client";
import { useState } from "react";
import CKEditor, { HtmlPreview } from "gh-ck-editor";
import "gh-ck-editor/styles.css";

export default function EditorPage() {
  const [content, setContent] = useState("");

  return (
    <div>
      <h1>My Editor</h1>
      <CKEditor
        value={content}
        onChangeValue={setContent}
        title="Content Editor"
      />
      <HtmlPreview html={content} />
    </div>
  );
}
```

### CSS Import

**Important**: Always import the CSS file to ensure proper styling:

```jsx
import "gh-ck-editor/styles.css";
```

You can also import it in your global CSS file or `_app.js`:

```jsx
// _app.js
import "gh-ck-editor/styles.css";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

## Troubleshooting

### "require is not defined" Error

If you encounter this error, it means the package is trying to use CommonJS in an ESM environment. This should be automatically resolved with the new build configuration, but if it persists:

1. Make sure you're using the latest version of the package
2. Clear your build cache: `rm -rf .next` (for Next.js)
3. Restart your development server

### CSS Not Loading

Make sure you import the CSS file:

```jsx
import "gh-ck-editor/styles.css";
```

### TypeScript Support

The package includes TypeScript definitions. Import types as needed:

```tsx
import CKEditor, {
  ICKEditorComponentProps,
  HtmlPreview,
  IHtmlPreviewComponentProps,
} from "gh-ck-editor";
```

## API Reference

### CKEditor Component

```tsx
interface ICKEditorComponentProps {
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
```

### HtmlPreview Component

```tsx
interface IHtmlPreviewComponentProps {
  html: string;
}
```
