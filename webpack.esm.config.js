import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default {
  entry: {
    index: "./src/index.tsx",
    styles: "./src/styles.css",
  },
  mode: "production",
  output: {
    path: path.resolve("dist"),
    filename: (pathData) => {
      return pathData.chunk.name === "styles" ? "[name].js" : "index.mjs";
    },
    library: { type: "module" },
    module: true,
    clean: false,
  },
  experiments: { outputModule: true },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: "ts-loader", exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  externals: {
    react: "module react",
    "react-dom": "module react-dom",
    "react/jsx-runtime": "module react/jsx-runtime",
    "@ckeditor/ckeditor5-react": "module @ckeditor/ckeditor5-react",
    "gh-ckeditor5-custom-build": "module gh-ckeditor5-custom-build",
    dompurify: "module dompurify",
  },
};
