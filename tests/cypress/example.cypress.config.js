const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Optionally, uncomment the next section to enable video recording. See
  // /tests/cypress/README.md.
  // "videos": {
  //   "enabled": true,
  //   "onTestFailure": true,
  //   "onTestFinish": false,
  //   "videoCompression": 32,
  //   "keepOnlyFailedTests": false,
  //   "ffmpegTimeout": 60000
  // },
  "component": {
    "fixturesFolder": "tests/cypress/fixtures",
    "integrationFolder": "tests/cypress/integration",
    "pluginsFile": "tests/cypress/plugins/index.js",
    "screenshotsFolder": "tests/cypress/screenshots",
    "downloadsFolder": "tests/cypress/downloads",
    "supportFile": "tests/cypress/support/e2e.js",
    "videosFolder": "tests/cypress/videos",
    "viewportWidth": 1440,
    "viewportHeight": 900
  },
  "e2e": {
    "setupNodeEvents": (on, config) => {
      // implement node event listeners here
    },
    // Add your local base url to the next line.
    "baseUrl": "",
    "specPattern": "tests/cypress/**/*.{js,jsx,ts,tsx}",
    "supportFile": "tests/cypress/support/e2e.js",
    "fixturesFolder": "tests/cypress/fixtures"
  }
}
);
