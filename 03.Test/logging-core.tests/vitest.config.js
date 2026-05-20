// @ts-check

import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.js'],
    environment: 'node',
    globals: true,
    restoreMocks: true,
  },
  resolve: {
    alias: {
      '@src': resolve(__dirname, '../../02.Product/logging-core/src'),
    },
  },
});
