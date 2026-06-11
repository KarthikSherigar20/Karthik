import login from "../../../support/login";

describe('Dropdown', () => {
    before(() => {
        login()
        cy.log('login completed')
    })

    it('dropdown', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(1).click();

        cy.wait(500);

        cy.get('select[style="border: 1px solid black;"]').find('option').then(($options) => {
            const dropdown = [];

            // Extract the text of each option
            $options.each((index, option) => {
                dropdown.push(option.innerText);
            });

            // Iterate through the dropdown options and select each one
            dropdown.forEach((drop) => {
                cy.log('Selecting value: ', drop)
                cy.get('select[style="border: 1px solid black;"]')
                    .select(drop)
                    .should('have.value', drop); // Assert selected value

                cy.wait(500);

                cy.contains('No data Found').scrollIntoView().should('be.visible');

                cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).scrollIntoView().click();

                cy.contains('benName', { timeout: 30000 }).scrollIntoView().should('be.visible');

                cy.get('button[class="BenAddressData_button__0kXLn"]').eq(2).scrollIntoView().click();

                cy.contains('No data Found', { timeout: 30000 }).scrollIntoView().should('be.visible');
            });
        });
        cy.wait(1000);
        cy.reload();

        let listCompanies = [];
        let clickedCompaniesCount = 0;

        // Step 1: Verify list is empty initially
        expect(listCompanies).to.have.length(0);
        cy.log('✓ listCompanies initialized as empty array');

        // Step 2: Open dropdown
        cy.get('button[id*="menu-button"]', { timeout: 5000 })
            .first()
            .click({ force: true });

        cy.log('✓ Dropdown opened');

        // Step 3: Wait for dropdown to be visible
        cy.get('[role="menu"]', { timeout: 5000 })
            .should('be.visible');

        cy.log('✓ Dropdown menu visible');

        // Step 4: Extract all companies and push to array
        cy.get('[role="menu"] [role="menuitem"]').each(($menuitem) => {
            const companyName = $menuitem.text().trim();
            if (companyName) {
                listCompanies.push(companyName);
            }
        }).then(() => {
            cy.log(`✓ Extracted ${listCompanies.length} companies to array`);

            // Print first 50 company names
            listCompanies.slice(0, 50).forEach((company, index) => {
                cy.log(`${index + 1}. ${company}`);
            });

            // Step 5: Iterate through all companies
            listCompanies.forEach((company, index) => {
                cy.log(`\n--- Testing Company ${index + 1}/${listCompanies.length}: ${company} ---`);

                // Open dropdown
                cy.get('button[id*="menu-button"]').first().scrollIntoView().click({ force: true });
                cy.get('[role="menu"]').should('be.visible');

                // Select company
                cy.get('[role="menu"] [role="menuitem"]')
                    .contains(company)
                    .click({ force: true });

                cy.wait(800);

                // Search
                cy.contains('button', 'Search').click({ force: true });
                cy.wait(1200);

                // Check if data found or not
                cy.get('body').then(($body) => {
                    if ($body.text().includes('No data Found')) {
                        cy.log('No data found - skipping Clear Filter');
                    } else {
                        cy.contains('benName').should('be.visible');
                        cy.contains('button', 'Clear Filter').click({ force: true });
                        cy.wait(800);
                        cy.contains('No data Found', { timeout: 30000 }).should('be.visible');
                    }
                });
                clickedCompaniesCount++;
                cy.log(`✓ ${company} tested`);
            });

            cy.log(`\n✓ All ${listCompanies.length} companies tested successfully`);
            cy.log(`Total companies clicked: ${clickedCompaniesCount}`);
            expect(clickedCompaniesCount).to.equal(listCompanies.length);
            cy.log(`✓ Verification passed: Clicked count matches array length`);
        });
    });


})