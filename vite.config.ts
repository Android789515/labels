import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [ react() ],
   resolve: {
      alias: {
         'types': resolve('./src/types.ts'),
         'components': resolve('./src/components'),
         'features': resolve('./src/features'),
      },
   },
});
