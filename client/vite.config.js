import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react({
      // React 16 requires classic runtime
      jsxRuntime: 'classic',
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }]
        ]
      }
    }),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      // Direct MUI pickers to its CJS build to avoid broken ESM
      '@material-ui/pickers': path.resolve(__dirname, 'node_modules/@material-ui/pickers/dist/material-ui-pickers.js'),
    },
  },
  define: {
    // This handles the 'process is not defined' error globally
    'process.env': {},
    'global': 'globalThis',
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true
  }
});
