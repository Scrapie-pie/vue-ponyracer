import { fileURLToPath, URL } from 'node:url';

import { configDefaults, defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          races: [
            './src/views/Races.vue',
            './src/views/PendingRaces.vue',
            './src/views/FinishedRaces.vue',
            './src/views/Bet.vue',
            './src/views/Live.vue'
          ],
          users: ['./src/views/Register.vue', './src/views/Login.vue', './src/views/ScoreHistory.vue']
        }
      }
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['src/views/__tests__/vitest-canvas.ts'],
    clearMocks: true,
    testTimeout: 10000,
    reporters: ['default', 'json'],
    outputFile: 'results/vitest-results.json',
    sequence: {
      shuffle: true
    },
    coverage: {
      provider: 'istanbul',
      all: true,
      exclude: [...configDefaults.coverage.exclude!, 'src/main.ts', 'src/router.ts', 'src/models'],
      reporter: ['json-summary', 'text', 'html']
    }
  }
});
