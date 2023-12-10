/* eslint-disable import/no-extraneous-dependencies */
const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

// Turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// Enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: '**/e2e/**/*.test.js',
  output: './e2e/output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://localhost:8080',
      show: true,
    },
  },
  name: 'Submission Akhir',
  multiple: {
    basic: {
      // Add specific configurations for parallel execution if needed
      helpers: {
        // Specific helper configurations for parallel execution
      },
    },
  },
  retries: 2, // Number of retries for failed tests
};
