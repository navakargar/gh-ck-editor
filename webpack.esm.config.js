import path from 'path';
import nodeExternals from 'webpack-node-externals';

export default {
  entry: './src/index.tsx',
  mode: 'production',
  output: {
    path: path.resolve('dist'),
    filename: 'index.mjs',
    library: {
      type: 'module',
    },
    clean: false,
  },
  experiments: {
    outputModule: true,
  },
  experiments: { outputModule: true },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  externals: [
    nodeExternals(),
    {
      react: 'react',
      'react-dom': 'react-dom',
      '@ckeditor/ckeditor5-react': '@ckeditor/ckeditor5-react',
      '@ckeditor/ckeditor5-build-classic': '@ckeditor/ckeditor5-build-classic',
    }
  ]
};
