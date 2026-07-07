const { defineConfig } = require("cypress");
const xlsx = require("node-xlsx").default;
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

module.exports = defineConfig({
reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/json",
    overwrite: false,
    html: false,
    json: true
  },
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
        readPdf(filePath) {
          const dataBuffer = fs.readFileSync(filePath);
          return pdf(dataBuffer).then((data) => data.text);
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
