import path from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    include: ['__tests__/**/*.{test,spec}.ts'],
    environment: 'node',
    env: {
      LOG_LEVEL: 'silent',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['lib/**/*.ts', 'db/**/*.ts', 'app/**/*.ts', 'hooks/**/*.ts'],
      exclude: ['**/*.d.ts', 'db/migrations/**'],
    },
  },
});
