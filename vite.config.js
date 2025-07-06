import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // config proxy for project
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 代理到后端服务
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置为true
        // 这里的rewrite是可选的，如果你的后端接口不需要/api前缀，可以使用rewrite来去掉
        // 例如：/api/v1/example -> /v1/example
        // 如果不需要rewrite，可以删除这一行
        // 例如：/api/v1/example -> /api/v1/example
        // 如果需要rewrite，可以使用以下配置
        //rewrite: (path) => path.replace(/^\/api/, '/api/')
      }
    } 
  }
})
