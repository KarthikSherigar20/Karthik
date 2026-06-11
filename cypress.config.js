const { defineConfig } = require("cypress");
const { MongoClient } = require('mongodb');
const fs = require("fs");
const xlsx = require("node-xlsx");
const path = require('path');
const { verifyDownloadTasks } = require('cy-verify-downloads');

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/json",
    overwrite: false,
    html: false,
    json: true,
    timestamp: "yyyy-mm-dd_HH-MM-ss"
  },

  e2e: {
    chromeWebSecurity: false,
    downloadsFolder: path.join(__dirname, "cypress/downloads"),
    setupNodeEvents(on, config) {
      on("task", {
        parseXlsx({ filePath }) {
          return new Promise((resolve, reject) => {
            try {
              const absolutePath = path.resolve(filePath);
              const jsonData = xlsx.parse(fs.readFileSync(absolutePath));
              resolve(jsonData)
            } catch (e) {
              reject(e);
            }
          })
        },
        findFiles({ folderPath, fileName }) {
          if (!fs.existsSync(folderPath)) return null;
          return fs.readdirSync(folderPath).filter((file) => file.includes(fileName));
        },
        verifyDownloadTasks,
        countFilesInDownloads() {
          const downloadsFolder = "cypress/downloads";
          if (!fs.existsSync(downloadsFolder)) return 0;

          const files = fs.readdirSync(downloadsFolder);
          return files.length;
        },
        countBulkQrFiles() {
          const downloadsFolder = "cypress/downloads";
          if (!fs.existsSync(downloadsFolder)) return 0;

          const files = fs.readdirSync(downloadsFolder);
          const bulkQrFiles = files.filter(file => file.startsWith("Bulk_QR_Codes"));
          return bulkQrFiles.length;
        },
        listFilesInDownloads() {
          const downloadsFolder = "cypress/downloads";
          if (!fs.existsSync(downloadsFolder)) return [];

          const files = fs.readdirSync(downloadsFolder);
          return files;
        },
        getLatestFileInDownloads() {
          const downloadsFolder = "cypress/downloads";
          if (!fs.existsSync(downloadsFolder)) return null;

          const files = fs.readdirSync(downloadsFolder)
            .map(file => ({
              name: file,
              time: fs.statSync(path.join(downloadsFolder, file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time);

          return files.length > 0 ? files[0].name : null;
        },
        getLatestFile() {
          const downloadsFolder = "cypress/downloads";
          if (!fs.existsSync(downloadsFolder)) return null;

          const files = fs.readdirSync(downloadsFolder)
            .filter(file => file.startsWith("Bulk_QR_Codes"))
            .map(file => ({
              name: file,
              time: fs.statSync(`${downloadsFolder}/${file}`).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time);

          return files.length > 0 ? files[0].name : null;
        },
        isFileExist(filePath) {
          return fs.existsSync(filePath);
        }
      });

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--ignore-certificate-errors');
        }
        return launchOptions;
      });
    },
    defaultCommandTimeout: 10000,
    downloads: 'cypress/downloads',
  },
});
