import login from "../../../support/login";

describe('textfields', () => {
    before(() => {
        login();
        cy.log('Login completed');
    });

    it('textfields', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(1).click();
        cy.wait(500);
        cy.contains('Search By Beneficiary').should('be.visible').click();
        cy.wait(500);
        cy.contains('Select a company').should('be.visible').click();
        cy.wait(500);
        cy.get('input[placeholder="Search companies..."]').type('Pococare');
        cy.wait(500);
        cy.get('button[role="menuitem"]').click();
        cy.wait(500);
        cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).click();
        cy.contains('benName', { timeout: 20000 }).should('be.visible');

        cy.wait(500);

        const requiredHeaders = ['benId', 'email', 'benName', 'benMobile', 'subscriberId'];
        const headerIndexes = {};
        const rowData = [];

        cy.get('thead th').each(($th, index) => {
            const headerText = $th.text().trim();
            if (requiredHeaders.includes(headerText)) {
                headerIndexes[headerText] = index;
            }
        }).then(() => {
            cy.get('tbody tr').first().within(() => {
                requiredHeaders.forEach((header) => {
                    const index = headerIndexes[header];
                    cy.get('td').eq(index).invoke('text').then((text) => {
                        rowData.push(text.trim());
                    });
                });
            });
        }).then(() => {
            cy.log('Row Data:', JSON.stringify(rowData));
            expect(rowData[0]).to.match(/^[a-f0-9]{24}$/);
            expect(rowData[1]).to.include('@');

            cy.reload();
            cy.wait(1000);

            // All dependent actions should go here!
            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(2).click();
            cy.contains('No data Found', { timeout: 20000 }).should('be.visible');

            cy.get('input[placeholder="Enter benId"]').scrollIntoView().type(rowData[0]);
            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).click();

            cy.contains('benName', { timeout: 20000 }).should('be.visible');
            cy.wait(500);
            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(2).click();
            cy.contains('No data Found', { timeout: 20000 }).should('be.visible');

            cy.get('input[placeholder="Enter email"]').scrollIntoView().type(rowData[1]);
            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).click();

            cy.contains('benName', { timeout: 20000 }).should('be.visible');
            cy.wait(500);

            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(2).click();
            cy.contains('No data Found', { timeout: 20000 }).should('be.visible');


            cy.get('input[placeholder="Enter name"]').scrollIntoView().type(rowData[2]);
            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).click();

            cy.contains('benName', { timeout: 20000 }).should('be.visible');
            cy.wait(500);

            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(2).click();
            cy.contains('No data Found', { timeout: 20000 }).should('be.visible');

            cy.get('input[placeholder="Enter PhoneNumber"]').scrollIntoView().type(rowData[3]);
            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).click();

            cy.contains('benName', { timeout: 20000 }).should('be.visible');
            cy.wait(500);

            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(2).click();
            cy.contains('No data Found', { timeout: 20000 }).should('be.visible');

            cy.get('input[placeholder="Enter city"]').scrollIntoView().type('Bangalore');
            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).click();

            cy.contains('benName', { timeout: 20000 }).should('be.visible');
            cy.wait(500);

            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(2).click();
            cy.contains('No data Found', { timeout: 20000 }).should('be.visible');

            cy.get('input[placeholder="Enter pinCode"]').scrollIntoView().type('560103');
            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).click();

            cy.contains('benName', { timeout: 20000 }).should('be.visible');
            cy.wait(500);

            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(2).click();
            cy.contains('No data Found', { timeout: 20000 }).should('be.visible');

            cy.get('input[placeholder="Enter subscriberId"]').scrollIntoView().type(rowData[4]);
            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).click();

            cy.contains('benName', { timeout: 20000 }).should('be.visible');
            cy.wait(500);

            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(2).click();
            cy.contains('No data Found', { timeout: 20000 }).should('be.visible');

            cy.get('input[placeholder="Enter subscriberEmail"]').scrollIntoView().type(rowData[1]);
            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).click();

            cy.contains('benName', { timeout: 20000 }).should('be.visible');
            cy.wait(500);

            cy.get('button[class="BenAddressData_button__0kXLn"]').eq(2).click();
            cy.contains('No data Found', { timeout: 20000 }).should('be.visible');

        });
    });
});
