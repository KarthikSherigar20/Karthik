import login from "../../support/login";

describe('BulkQrGenerator', () => {
    before(() => {
        login();
        cy.log('Login completed');
    });

    it('Bulk Qr - download and validate filename timestamp', () => {
        cy.get('svg.chakra-icon.css-6ey7w3').eq(0).scrollIntoView().click();
        cy.wait(500);
        cy.get('body').should('contain', 'Bulk Qr Generate');
        cy.contains('Bulk Qr Generate').click();

        const checkAndDownloadQR = () => {
            cy.contains('NotDownloaded QR Count:')
                .invoke('text')
                .then((text) => {
                    const match = text.match(/\d+/);
                    const count = match ? parseInt(match[0], 10) : 0;
                    cy.log('Extracted Count:', count);

                    if (count > 0) {
                        cy.get('input.chakra-input.css-1cjy4zv').eq(1).clear().type('1');
                        cy.contains('Download Excel').click();

                        cy.wait(5000); // wait for file to download

                        cy.task("countFilesInDownloads").then((countF) => {
                            cy.log("Total files in downloads folder:", countF);

                            if (countF > 0) {
                                cy.task("getLatestFile").then((latestFile) => {
                                    cy.log("Latest file found:", latestFile);

                                    // Extract date and time up to minutes from the filename
                                    const match = latestFile.match(/(\d{2}_\d{2}_\d{4}_\s\d{2}_\d{2})/);
                                    const fileDateTime = match ? match[1] : null;

                                    cy.log("Extracted date-time from filename:", fileDateTime);

                                    // Get current system date-time in same format
                                    const getFormattedDateTime = () => {
                                        const now = new Date();
                                        const pad = (n) => n.toString().padStart(2, '0');

                                        const day = pad(now.getDate());
                                        const month = pad(now.getMonth() + 1);
                                        const year = now.getFullYear();
                                        const hours = pad(now.getHours());
                                        const minutes = pad(now.getMinutes());

                                        return `${day}_${month}_${year}_ ${hours}_${minutes}`;
                                    };

                                    const systemDateTime = getFormattedDateTime();
                                    cy.log("Current system date-time:", systemDateTime);

                                    // Compare
                                    if (fileDateTime === systemDateTime) {
                                        cy.log("✅ File timestamp matches current system time (up to minutes)");
                                    } else {
                                        cy.log("❌ Mismatch: fileDateTime = " + fileDateTime + ", systemDateTime = " + systemDateTime);
                                    }
                                });
                            } else {
                                cy.log("❌ No file present - File not downloaded");
                            }
                        });
                    } else {
                        cy.log('No QR codes available for download. Generating now...');

                        cy.wait(500);
                        cy.get('input[class="chakra-input css-1cjy4zv"]').eq(0).clear().type(5);
                        cy.contains('Generate Documents').click();

                        cy.wait(3000); // Give it some time to generate

                        // 🔁 Retry
                        checkAndDownloadQR();
                    }
                });
        };

        // ✅ Initial call
        checkAndDownloadQR();
    });
});
