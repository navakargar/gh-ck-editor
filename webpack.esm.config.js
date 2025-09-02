import path from 'path';

export default {
  entry: './src/index.tsx',
  mode: 'production',
  output: {
    path: path.resolve('dist'),
    filename: 'index.mjs',
    library: { type: 'module' },
    module: true,
    clean: false,
  },
  experiments: { outputModule: true },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    '@ckeditor/ckeditor5-react': '@ckeditor/ckeditor5-react',
    '@ckeditor/ckeditor5-build-classic': '@ckeditor/ckeditor5-build-classic',
  },
};
