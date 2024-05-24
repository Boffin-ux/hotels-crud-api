import { resolve as _resolve } from 'path';

export const entry = _resolve(__dirname, 'src/index.ts');
export const output = {
  filename: 'index.js',
  path: _resolve(__dirname, 'dist'),
  clean: true,
};
export const mode = 'production';
export const module = {
  rules: [
    {
      test: /\.[tj]s$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ],
};
export const resolve = {
  extensions: ['.ts', '.js'],
};
export const target = 'node';
