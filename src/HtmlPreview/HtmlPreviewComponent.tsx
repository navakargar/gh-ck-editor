import React from "react";
import { domSanitizer } from "./utils";

export interface IHtmlPreviewComponentProps {
  html: string;
}

export default function HtmlPreviewComponent(
  props: IHtmlPreviewComponentProps
) {
  const { html } = props;

  const sanitizedHtml = domSanitizer(html);

  return (
    <div
      className="html-preview"
      dangerouslySetInnerHTML={{
        __html: sanitizedHtml || "",
      }}
    />
  );
}
