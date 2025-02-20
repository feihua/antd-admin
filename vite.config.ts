import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import {fileURLToPath, URL} from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  base: loadEnv(process.env.NODE_ENV || '', process.cwd()).VITE_APP_DEPLOY_PATH,//deploy to non-root directory
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8600/', // 目标服务器地址
        changeOrigin: true, // 是否改变源地址
        // rewrite: (path) => path.replace(/^\/antd/, ''), // 重写路径
      },
      '/pay-api': {
        target: 'http://110.41.179.89/', // 目标服务器地址
        changeOrigin: true, // 是否改变源地址
        // rewrite: (path) => path.replace(/^\/pay/, ''), // 重写路径
      },
      '/better': {
        target: 'http://43.136.115.138:8600/', // 目标服务器地址
        changeOrigin: true, // 是否改变源地址
        rewrite: (path) => path.replace(/^\/better/, ''), // 重写路径
      },
    },
  },
});
