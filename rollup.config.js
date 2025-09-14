import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import path from 'path';

const input = 'src/index.tsx';
const outputDir = 'dist';

export default [
  // ESM
  {
    input,
    output: {
      file: path.join(outputDir, 'index.mjs'),
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      peerDepsExternal(),
      resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
      commonjs({ include: /node_modules/ }),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: 'node_modules/**',
      }),
      postcss({ extract: false, inject: true }),
      terser(),
    ],
  },

  // CJS
  {
    input,
    output: {
      file: path.join(outputDir, 'index.cjs'),
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    plugins: [
      peerDepsExternal(),
      resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
      commonjs({ include: /node_modules/ }),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: 'node_modules/**',
      }),
      postcss({ extract: false, inject: true }),
      terser(),
    ],
  },
];
