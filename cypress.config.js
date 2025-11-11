const { defineConfig } = require('cypress');
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://stage.apis.pococare.com',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: true,
    screenshotOnRunFailure: true,
    requestTimeout: 10000,
    responseTimeout: 10000,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      timestamp: 'mmddyyyy_HHMMss'
    },
    env: {
      apiUrl: 'https://stage.apis.pococare.com/beneficiary/api/v1/beneficiary',
      authUrl: 'https://stage.apis.pococare.com/auth'
    },
    setupNodeEvents(on, config) {
      on('task', {
        'db:seed': () => null,
        'db:clean': () => null,
        'log': (message) => {
          console.log(message);
          return null;
        },
        'logApiCall': (data) => {
          const reportsDir = 'cypress/reports';
          const logFile = 'cypress/reports/api-calls.json';
          
          if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
          }
          
          let logs = [];
          if (fs.existsSync(logFile)) {
            logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
          }
          logs.push({
            timestamp: new Date().toISOString(),
            ...data
          });
          fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
          return null;
        },
        'updateTestData': (updateData) => {
          const testDataPath = 'cypress/fixtures/testData.json';
          const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
          
          // Update auth headers
          if (updateData.Cookie) testData.auth.headers.Cookie = updateData.Cookie;
          if (updateData.Cookie1) testData.auth.headers.Cookie1 = updateData.Cookie1;
          
          // Update subscriber data if provided
          if (updateData.subscriber) {
            testData.subscriber = { ...testData.subscriber, ...updateData.subscriber };
          }
          
          // Update any other data
          if (updateData.lastRun) {
            testData.lastRun = updateData.lastRun;
          }
          
          fs.writeFileSync(testDataPath, JSON.stringify(testData, null, 2));
          return null;
        }
      });
    }
  }
});