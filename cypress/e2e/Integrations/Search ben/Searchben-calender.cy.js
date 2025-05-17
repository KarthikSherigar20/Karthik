import login from "../../../support/login";

describe('Searchben-calender', () => {
    before(() => {
        login()
        cy.log('Login completed')
    })

    it('Searchben-calender', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(1).click();

        const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
        const weekAgo = new Date(Date.now() - 15 * 86400000).toISOString().split('T')[0];

        cy.contains('p', 'Filter By CreatedDate').parent()
            .find('input[type="date"]').eq(0).type(weekAgo);     // From 7 days ago

        cy.contains('p', 'Filter By CreatedDate').parent()
            .find('input[type="date"]').eq(1).type(today);       // To today

        cy.wait(500);

        cy.contains('No data Found').should('be.visible');

        cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).click();

        cy.contains('benName', { timeout: 30000 }).should('be.visible')

        cy.wait(500);

        cy.get('button[class="BenAddressData_button__0kXLn"]').eq(2).click();

        cy.contains('No data Found', { timeout: 30000 }).should('be.visible')


        cy.contains('p', 'Filter By UpdatedDate').parent()
            .find('input[type="date"]').eq(0).type(weekAgo);


        cy.contains('p', 'Filter By UpdatedDate').parent()
            .find('input[type="date"]').eq(1).type(today);

        cy.wait(500);

        cy.contains('No data Found').should('be.visible');

        cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).click();

        cy.contains('benName', { timeout: 30000 }).should('be.visible')

        cy.wait(500);

        cy.get('button[class="BenAddressData_button__0kXLn"]').eq(2).click();

        cy.contains('No data Found', { timeout: 30000 }).should('be.visible')

    })
})