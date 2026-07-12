import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
