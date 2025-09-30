// vite.config.js
import { resolve } from 'path';

export default {
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        daily: resolve(__dirname, 'dailyfortune/index.html'),
        ask: resolve(__dirname, 'askAnything/index.html'),
      },
    },
  },
};
