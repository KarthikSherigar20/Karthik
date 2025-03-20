const { defineConfig } = require("cypress");
const { MongoClient } = require('mongodb');
const fs=require("fs");
const xlsx= require("node-xlsx");
const path = require('path');

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
  },
});