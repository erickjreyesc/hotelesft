import { resolve as _resolve } from 'path';

export const publicPath = process.env.VUE_APP_PUBLIC_PATH || '/';
export const configureWebpack = {
  resolve: {
    alias: {
      '@assets': _resolve(__dirname, 'src/assets')
    }
  }
};
