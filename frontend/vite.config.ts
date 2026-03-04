import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'context', replacement: path.resolve(__dirname, 'src/context') },
      { find: 'components', replacement: path.resolve(__dirname, 'src/components') },
      { find: 'services', replacement: path.resolve(__dirname, 'src/services') },
      { find: 'types', replacement: path.resolve(__dirname, 'src/types') },
      { find: 'pages', replacement: path.resolve(__dirname, 'src/pages') },
    ]
  }
});