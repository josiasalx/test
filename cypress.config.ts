import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 8000,
    env: {
      apiBase: process.env.API_BASE || 'http://localhost:3000/api', // adjust if needed
      adminEmail: process.env.ADMIN_EMAIL || 'admin@example.com',
      adminPassword: process.env.ADMIN_PASSWORD || 'Admin123!'
    },
    setupNodeEvents(on, config) {
      // add task hooks here if you need DB seeding/cleanup
      return config;
    },
  },
});
