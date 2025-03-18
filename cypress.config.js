const { defineConfig } = require("cypress");
const { MongoClient } = require('mongodb');

module.exports = defineConfig({
  e2e: {
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
      timestamp: "mmddyyyy_HHMMss",
    },
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--ignore-certificate-errors');
        }
        return launchOptions;
      });
      // implement node event listeners here
    },
  //   watchForFileChanges: false,
  // // chromeWebSecurity: false,
  //   experimentalSessionAndOrigin: true,
  defaultCommandTimeout: 10000,
  },
});
