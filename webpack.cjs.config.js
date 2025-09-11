import path from "path";

export default {
  entry: "./src/index.tsx",
  mode: "production",
  output: {
    path: path.resolve("dist"),
    filename: "index.cjs",
    libraryTarget: "commonjs2",
    clean: false,
  },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: "ts-loader", exclude: /node_modules/ },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  externals: {
    react: "commonjs react",
    "react-dom": "commonjs react-dom",
    "@ckeditor/ckeditor5-react": "commonjs @ckeditor/ckeditor5-react",
    "gh-ckeditor5-custom-build": "commonjs gh-ckeditor5-custom-build",
  },
};
