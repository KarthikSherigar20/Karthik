const fs = require('fs');
const path = require('path');

// Directory to process
const directoryPath = 'D:/Cypress/EM/cypress/e2e/DataFlow/1st Page'; // Change this to your target directory

// Function to process file content
function processFileContent(content) {
  // Change the import path
  const modifiedContent = content.replace(
    'import login from "../../support/login"',
    'import login from "../../../support/login"'
  );
  return modifiedContent;
}

// Function to read, modify, and save each file
function processFilesInDirectory(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Could not list the directory.`, err);
      process.exit(1);
    }

    files.forEach((file, index) => {
      const filePath = path.join(directoryPath, file);

      fs.stat(filePath, (error, stat) => {
        if (error) {
          console.error(`Error stating file.`, error);
          return;
        }

        if (stat.isFile() && path.extname(filePath) === '.js') { // Process only JavaScript files
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              console.error(`Error reading file.`, err);
              return;
            }

            const modifiedContent = processFileContent(data);

            fs.writeFile(filePath, modifiedContent, 'utf8', (err) => {
              if (err) {
                console.error(`Error writing file.`, err);
              } else {
                console.log(`File ${filePath} has been modified.`);
              }
            });
          });
        } else if (stat.isDirectory()) {
          // Recursively process subdirectories
          processFilesInDirectory(filePath);
        }
      });
    });
  });
}

// Run the script
processFilesInDirectory(directoryPath);
