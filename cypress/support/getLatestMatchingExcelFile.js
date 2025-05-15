const fs = require("fs");
const xlsx = require("node-xlsx");
const path = require('path');

const getLatestMatchingExcelFile = () => {
  const downloadsFolder = "C:/Users/Karth/Downloads";
  const files = fs.readdirSync(downloadsFolder);

  // Get the current date & time in DD_MM_YYYY_ HH_MM format
  const now = new Date();
  const formattedDateTime = `${String(now.getDate()).padStart(2, '0')}_` +
    `${String(now.getMonth() + 1).padStart(2, '0')}_` +
    `${now.getFullYear()}_ ` +
    `${String(now.getHours()).padStart(2, '0')}_` +
    `${String(now.getMinutes()).padStart(2, '0')}`;

  cy.log('formatteddate', formattedDateTime);

  // Match files with pattern "Bulk_QR_Codes-DD_MM_YYYY_ HH_MM"
  const matchingFiles = files.filter(file =>
    file.startsWith("Bulk_QR_Codes-") && file.includes(formattedDateTime)
  );

  if (matchingFiles.length > 0) {
    return path.join(downloadsFolder, matchingFiles[0]); // Return full file path
  }
  return null; // No matching file found
}


export default getLatestMatchingExcelFile;