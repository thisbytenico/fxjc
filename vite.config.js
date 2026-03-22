import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vitePluginImport from 'vite-plugin-babel-import';
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const baseUrl = {
  development: './',
  beta: './',
  release: './',
  production: './'
}

const httpBaseUrls = {
  development: '/api',
  beta: './',
  release: '',
  production:''
}

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // vitePluginImport([
    //   {
    //     libraryName: 'element-plus',
    //     libraryDirectory: 'es',
    //     style(name) {
    //       return `element-plus/lib/theme-chalk/${name}.css`;
    //     },
    //   }
    // ]),
  ],
  base: baseUrl[mode],
  define: {
    'process.env': {
      'BASE_API': httpBaseUrls[mode]
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://10.0.52.114',//'http://172.16.7.89:8002/',//
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
    // 热更新配置
    hmr: {
      enabled: true,
      overlay: true
    }
  },
  // ******项目构建配置******
  build: {
    target: 'modules', //设置最终构建的浏览器兼容目标  //es2015(编译成es5) | modules
    outDir: 'dist', // 构建得包名  默认：dist
    assetsDir: 'assets', // 静态资源得存放路径文件名  assets
    sourcemap: false, //构建后是否生成 source map 文件
    brotliSize: false, // 启用/禁用 brotli 压缩大小报告。 禁用该功能可能会提高大型项目的构建性能
    minify: 'esbuild', // 项目压缩 :boolean | 'terser' | 'esbuild'
    chunkSizeWarningLimit: 2000, //chunk 大小警告的限制（以 kbs 为单位）默认：500
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/')
            : [];
          const fileName =
            facadeModuleId[facadeModuleId.length - 2] || '[name]';
          return `js/${fileName}/[name].[hash].js`;
        }
      }
    },
    cssTarget: 'chrome61' //防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式  (要兼容的场景是安卓微信中的 webview 时,它不支持 CSS 中的 #RGBA 十六进制颜色符号)
  },
})
