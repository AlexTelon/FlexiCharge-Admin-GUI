import { defineConfig } from 'cypress';
import setupNodeEvents from './cypress/plugins/index';

export default defineConfig({
  viewportHeight: 900,
  viewportWidth: 1440,
  e2e: {
    setupNodeEvents,
    baseUrl: 'http://localhost:8080',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  }
});