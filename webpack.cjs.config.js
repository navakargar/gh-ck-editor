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
      return pathData.chunk.name === "styles" ? "[name].js" : "index.cjs";
    },
    libraryTarget: "commonjs2",
    clean: false,
  },
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
    react: "commonjs react",
    "react-dom": "commonjs react-dom",
    "react/jsx-runtime": "commonjs react/jsx-runtime",
    "@ckeditor/ckeditor5-react": "commonjs @ckeditor/ckeditor5-react",
    "gh-ckeditor5-custom-build": "commonjs gh-ckeditor5-custom-build",
    dompurify: "commonjs dompurify",
  },
};
