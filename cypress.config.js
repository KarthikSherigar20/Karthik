const { defineConfig } = require("cypress");
const { MongoClient } = require('mongodb');
const fs=require("fs");
const xlsx= require("node-xlsx");
const path = require('path');
const { verifyDownloadTasks } = require('cy-verify-downloads');

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
    downloadsFolder: path.join(__dirname, "cypress/downloads"), 
    setupNodeEvents(on, config) {
      on("task",{
        parseXlsx({ filePath}){
          return new Promise((resolve , reject)=>{
            try{
              const absolutePath = path.resolve(filePath);
              const jsonData= xlsx.parse(fs.readFileSync(absolutePath));
              resolve(jsonData)
            }catch(e){
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
        if (!fs.existsSync(downloadsFolder)) return 0; // If folder doesn't exist, return 0

        const files = fs.readdirSync(downloadsFolder);
        return files.length;
         // Return count of files
      },
      countBulkQrFiles() {
        const downloadsFolder = "cypress/downloads";
        if (!fs.existsSync(downloadsFolder)) return 0;
    
        const files = fs.readdirSync(downloadsFolder);
        const bulkQrFiles = files.filter(file => file.startsWith("Bulk_QR_Codes"));
        return bulkQrFiles.length; // Return count of Bulk_QR_Codes files
      },
      listFilesInDownloads() {
        const downloadsFolder = "cypress/downloads";
        if (!fs.existsSync(downloadsFolder)) return []; // Return empty array if folder doesn't exist

        const files = fs.readdirSync(downloadsFolder);
        return files; // Return list of filenames
      },
      getLatestFileInDownloads() {
        const downloadsFolder = "cypress/downloads";
        if (!fs.existsSync(downloadsFolder)) return null; // If folder doesn't exist, return null

        const files = fs.readdirSync(downloadsFolder)
          .map(file => ({
            name: file,
            time: fs.statSync(path.join(downloadsFolder, file)).mtime.getTime() // Get modification time
          }))
          .sort((a, b) => b.time - a.time); // Sort by time (latest first)

        return files.length > 0 ? files[0].name : null; // Return the most recent file's name
      },
      getLatestFile() {
        const downloadsFolder = "cypress/downloads";
        if (!fs.existsSync(downloadsFolder)) return null;
    
        const files = fs.readdirSync(downloadsFolder)
          .filter(file => file.startsWith("Bulk_QR_Codes")) // Only Bulk_QR_Codes files
          .map(file => ({
            name: file,
            time: fs.statSync(`${downloadsFolder}/${file}`).mtime.getTime()
          }))
          .sort((a, b) => b.time - a.time); // Sort by latest timestamp
    
        return files.length > 0 ? files[0].name : null;
      },
      isFileExist(filePath) {
        return fs.existsSync(filePath);
      }
    
       
      })
    
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
  downloads:'cypress/downloads',
  },
});