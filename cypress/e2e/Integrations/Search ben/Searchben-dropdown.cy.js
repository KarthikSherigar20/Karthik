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

        const dropdownValues = [];
        cy.get('.CustomSelect_select_border__lWd7w').select('Select Company');
        cy.wait(500);

        cy.get('.CustomSelect_select_border__lWd7w')
            .find('option')
            .each(($ec) => {
                dropdownValues.push($ec.text()); // Collect all dropdown values
            })
            .then(() => {

                // Iterate over the collected values
                dropdownValues.forEach((value) => {
                    cy.log('Selecting value: ', value)
                    if(value !== 'Select Company'){
                        cy.get('.CustomSelect_select_border__lWd7w').select(value)
                        .should('have.value', value)// Select the current value
                    }

                    cy.wait(500);

                    // cy.contains('No data Found').scrollIntoView().should('be.visible');

                    cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).scrollIntoView().click();

                    cy.contains(/benName|No data Found/, { timeout: 30000 }).scrollIntoView().should('be.visible');

                    // cy.get('button[class="BenAddressData_button__0kXLn"]').eq(2).scrollIntoView().click();

                    // cy.contains('No data Found', { timeout: 30000 }).scrollIntoView().should('be.visible');

                    cy.wait(1000);
                });
            });


    })
})