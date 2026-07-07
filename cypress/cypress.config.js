const { defineConfig } = require("cypress");
const pdf = require('pdf-parse');
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        readPdf(filePath) {
          const dataBuffer = fs.readFileSync(filePath);
          return pdf(dataBuffer).then((data) => data.text);
        }
      }
        // implement node event listeners here
      )
    }
  }
});
