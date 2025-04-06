import { defineConfig } from 'vite';
import { resolve } from 'path';
import uni from '@dcloudio/vite-plugin-uni';
import { UnifiedViteWeappTailwindcssPlugin } from 'weapp-tailwindcss/vite';

export default defineConfig(async () => {
    // 这里必须这样引用，因为 uni 只提供了 cjs 的版本且 uni-app 默认 cjs，而 @tailwindcss/vite 只提供了 esm 版本
    const { default: tailwindcss } = await import('@tailwindcss/vite');
    return {
        server: {
            //跨域配置
            host: '0.0.0.0',
            port: 5174,
            open: true, //是否自动打开浏览器
        },
        build: {
            // minify: 'terser',
            // terserOptions: {
            //     compress: {
            //         drop_console: true,
            //     },
            // },
            // rollupOptions: {
            //     output: {
            //         chunkFileNames: 'assets/js/[name]-[hash].js',
            //         entryFileNames: 'assets/js/[name]-[hash].js',
            //         assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
            //     },
            // },
            //   关闭文件计算
            reportCompressedSize: false,
        },
        // 路径配置
        resolve: {
          alias: {
            "@": resolve(__dirname, "src")
          }
        },
        plugins: [
            uni(),
            tailwindcss(),
            UnifiedViteWeappTailwindcssPlugin({
                rem2rpx: true,
            }),
        ],
    };
});