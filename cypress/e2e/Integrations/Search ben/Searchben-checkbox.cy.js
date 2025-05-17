import login from "../../../support/login";

describe('Checkbox', () => {
    before(() => {
        login()
        cy.log('Login completed')
    })

    it('Checkbox', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(1).click();

        cy.wait(500);

        const chec = 'input[class="checkbox_inputStyle__Rjg8M"]';

        cy.get(chec).each((check, index) => {
            // Scroll into view and click to check
            cy.wrap(check).scrollIntoView().then(($checkbox) => {

                if ($checkbox.is(':checked')) {

                    cy.wait(1000);

                    cy.get(chec).eq(index)
                        .click();

                    cy.wait(500);

                    // Assert that the checkbox is checked
                    cy.get(chec).eq(index)
                        .should('not.be.checked');

                    cy.contains('No data Found').scrollIntoView().should('be.visible');

                    cy.wait(500);

                    cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).click();

                    cy.contains('benName', { timeout: 30000 }).scrollIntoView().should('be.visible'); // waits 30 seconds


                    cy.wait(500);

                    // Re-query the checkbox (breaking the chain)
                    cy.get(chec).eq(index).scrollIntoView()
                        .click();

                    // Assert that the checkbox is unchecked
                    cy.get(chec).eq(index)
                        .should('be.checked');

                    cy.contains('benName').scrollIntoView().should('be.visible');


                    cy.wait(500);

                    cy.get('button[class="BenAddressData_button__0kXLn"]').eq(2).click();

                    cy.contains('No data Found', { timeout: 30000 }).scrollIntoView().should('be.visible'); // waits 30 seconds


                } else {
                    cy.get(chec).eq(index)
                        .click();
                    // Assert that the checkbox is checked
                    cy.get(chec).eq(index)
                        .should('be.checked');

                    cy.contains('No data Found').scrollIntoView().should('be.visible');

                    cy.wait(500);

                    cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).click();

                    cy.contains('benName', { timeout: 30000 }).scrollIntoView().should('be.visible'); // waits 30 seconds

                    // Re-query the checkbox (breaking the chain)
                    cy.get(chec).eq(index)
                        .click();

                    // Assert that the checkbox is unchecked
                    cy.get(chec).eq(index)
                        .should('not.be.checked');

                    cy.contains('benName').scrollIntoView().should('be.visible');

                    cy.wait(500);

                    cy.get('button[class="BenAddressData_button__0kXLn"]').eq(2).click();

                    cy.contains('No data Found', { timeout: 30000 }).scrollIntoView().should('be.visible'); // waits 30 seconds
                }
            })
        });
    })
})