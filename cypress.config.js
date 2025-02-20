const { defineConfig } = require("cypress");
const xlsx = require("node-xlsx").default;
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",

  // pageLoadTimeout: 180000,
  watchForFileChanges: false,

  video: false,

  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      // implement node event listeners here
      on("task", {
        parseXlsx({ filePath }) {
          return new Promise((resolve, reject) => {
            try {
              const jsonData = xlsx.parse(fs.readFileSync(filePath));
              resolve(jsonData);
            } catch (e) {
              reject(e);
            }
          });
        },
      });
    },
  },
  defaultCommandTimeout: 10000,

  component: {
    devServer: {
      framework: "nuxt",
      bundler: "webpack",
    },
  },
});
