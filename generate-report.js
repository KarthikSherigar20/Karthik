const { execSync } = require('child_process');

const now = new Date();

const timestamp =
  now.getFullYear() +
  '-' +
  String(now.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(now.getDate()).padStart(2, '0') +
  '_' +
  String(now.getHours()).padStart(2, '0') +
  '-' +
  String(now.getMinutes()).padStart(2, '0') +
  '-' +
  String(now.getSeconds()).padStart(2, '0');

execSync(
  `npx marge cypress/reports/report.json -f Report_${timestamp}`,
  { stdio: 'inherit' }
);