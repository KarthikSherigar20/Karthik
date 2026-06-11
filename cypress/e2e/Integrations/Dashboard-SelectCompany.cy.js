import login from "../../support/login";


describe('Dashboard-SelectCompany', () => {
    before(() => {
        cy.wrap(null).then(() => {
            login();
        }).then(() => {
            cy.log('Login completed');
        })
    })
    it('should click on SVG icon, wait, and log dropdown details', () => {
        // cy.visit('/your-page-url'); // Replace with your page URL

        // Step 1: Click on the SVG icon
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(0).click();

        // Step 2: Wait for 1 second (not recommended but included as per request)
        cy.wait(1000);

        // const dropdownValues = [];
        // cy.contains('option', 'Select Company').click({ force: true });

        // cy.get('.CustomSelect_select_border__lWd7w')
        //     .find('option')
        //     .each(($ec) => {
        //         dropdownValues.push($ec.text()); // Collect all dropdown values
        //     })
        //     .then(() => {
        //         // Iterate over the collected values
        //         dropdownValues.forEach((value) => {
        //             cy.get('.CustomSelect_select_border__lWd7w').select(value); // Select the current value
        //             cy.wait(500); // Wait for any potential UI updates
        //             if (value !== 'Select Company') {
        //                 cy.get('.CustomSelect_select_border__lWd7w option:selected')
        //                   .should('have.text', value);
        //             }
        //         });
        //     });
        let listCompanies = [];

        // Step 1: Click on Select Company input to open dropdown
        cy.get('input[placeholder="Select Company"]')
            .click();

        cy.log('✓ Step 1: Clicked on Select Company input');

        // Step 2: Wait for Chakra select options to appear
        cy.get('[role="listbox"]', { timeout: 8000 })
            .should('exist');

        cy.wait(800);
        cy.log('✓ Step 2: Dropdown options visible');

        // Step 3: Extract all companies from visible dropdown options
        cy.get('[role="listbox"] [role="option"]')
            .each(($option) => {
                const companyName = $option.text().trim();
                if (companyName && companyName.length > 0) {
                    listCompanies.push(companyName);
                }
            })
            .then(() => {
                cy.log(`✓ Step 3: Extracted ${listCompanies.length} companies`);
                listCompanies.forEach((company, idx) => {
                    cy.log(`  ${idx + 1}. ${company}`);
                });
            });

        // Step 4: Click outside to close dropdown, then clear input
        cy.get('body').click();
        cy.wait(300);

        cy.get('input[placeholder="Select Company"]')
            .clear()
            .then(() => {
                cy.log('✓ Step 4: Cleared input field');
            });

        // Step 5: Iterate through each company
        cy.then(() => {
            listCompanies.forEach((company, index) => {
                cy.log(`\n--- Testing Company ${index + 1}/${listCompanies.length}: ${company} ---`);

                // Click to open dropdown
                cy.get('input[placeholder="Select Company"]')
                    .click();

                cy.wait(500);

                // Select the company from dropdown
                cy.get('[role="listbox"] [role="option"]')
                    .contains(company)
                    .click();

                cy.wait(800);

                // Step 6: Verify company text is in input field
                cy.get('input[placeholder="Select Company"]')
                    .should('have.value', company)
                    .then(() => {
                        cy.log(`✓ Verified: "${company}" is selected in input field`);
                    });
            });

            cy.log(`\n✓ All ${listCompanies.length} companies tested successfully`);
        });
    });
})