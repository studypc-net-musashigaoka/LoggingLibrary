// @ts-check

import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { playwright } from '@vitest/browser-playwright';

const project = {
  resolve: {
    alias: {
      '@src': resolve(import.meta.dirname, '../../02.Product/logging-core/src'),
    },
  },
  test: {
    globals: true,
    restoreMocks: true,
  },
};

export default defineConfig({
  test: {
    projects: [
      /* node用 */ {
        resolve: project.resolve,
        test: {
          ...project.test,
          name: 'node-tests',
          environment: 'node',
          include: ['tests/**/*.test.js', 'tests/**/*.node-test.js'],
        },
      },
      /* dom用 */ {
        resolve: project.resolve,
        test: {
          ...project.test,
          name: 'dom-tests',
          environment: 'happy-dom',
          include: ['tests/**/*.test.js', 'tests/**/*.dom-test.js'],
        },
      },
      /* browser用 */ {
        resolve: project.resolve,
        test: {
          ...project.test,
          name: 'browser-tests',
          include: ['tests/**/*.browser-test.js'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
