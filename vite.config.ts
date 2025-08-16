// vite.config.ts
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]],
      },
    }),
    // Gzip compression for production
    mode === 'production' &&
      compression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 10240,
      }),
    // Brotli compression for production
    mode === 'production' &&
      compression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 10240,
      }),
    // Bundle analyzer in development
    mode === 'development' &&
      visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),

  base: process.env.BASE_URL ?? (mode === 'production' ? '/port-vue-folio/' : '/'),

  build: {
    outDir: 'dist',
    sourcemap: mode === 'development',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.info'] : [],
      },
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core vendor chunk
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@heroui')) {
              return 'heroui-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            // Group remaining small dependencies
            return 'vendor';
          }
          // Feature-based code splitting
          if (id.includes('src/features')) {
            const feature = id.split('/features/')[1]?.split('/')[0];
            if (feature) {
              return `feature-${feature}`;
            }
          }
          // Shared utilities and components
          if (id.includes('src/shared')) {
            if (id.includes('/hooks/')) return 'hooks';
            if (id.includes('/hoc/')) return 'hoc';
            if (id.includes('/utils/')) return 'utils';
            if (id.includes('/components/')) return 'shared-components';
          }
        },
        // Optimize chunk names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()
            : 'chunk';
          return `assets/js/[name]-${facadeModuleId}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.').pop() || 'asset';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|ttf|eot/i.test(extType)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[ext]/[name]-[hash][extname]`;
        },
      },
    },
  },

  // Optimization settings
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', '@heroui/react'],
    exclude: ['@vite/client', '@vite/env'],
  },

  // Performance optimizations
  server: {
    hmr: {
      overlay: true,
    },
    fs: {
      strict: true,
    },
  },

  // CSS optimization
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
}));
