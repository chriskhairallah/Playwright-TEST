import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Sitecore D2C Website Testing
 * This configuration is optimized for testing a LIVE website (not localhost)
 * Tests run sequentially (no parallelization) for stability
 */
export default defineConfig({
  // Test directory
  testDir: './tests',
  
  // Maximum time one test can run (30 seconds to handle slow site responses)
  timeout: 30 * 1000,
  
  // Maximum time expect() should wait for condition to be met
  expect: {
    timeout: 10000,
  },
  
  // Run tests sequentially (one at a time) for stability
  fullyParallel: false,
  workers: 1,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only (not locally)
  retries: process.env.CI ? 2 : 0,
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results.json' }],
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL - REPLACE THIS WITH YOUR ACTUAL WEBSITE URL
    baseURL: 'https://myshop.com', // TODO: CHANGE THIS TO YOUR SITECORE WEBSITE URL
    
    // Take screenshot on failure
    screenshot: 'only-on-failure',
    
    // Capture trace on failure (helps with debugging)
    trace: 'retain-on-failure',
    
    // Wait until network is idle before considering navigation successful
    navigationTimeout: 30000,
    
    // Video recording on failure
    video: 'retain-on-failure',
  },

  // Configure projects for multiple browsers
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Additional Chrome-specific settings
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    // Mobile testing configuration (optional - uncomment to enable)
    {
      name: 'mobile-chrome',
      use: { 
        ...devices['iPhone 12'],
      },
    },
  ],

  // Web server configuration (not needed for external website testing)
  // webServer: undefined,
});
