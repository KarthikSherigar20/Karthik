import url from "../../../fixtures/urls.json"

describe('Footer Contact Info Block', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.contains('"Terms & Conditions"')
            .should('have.attr', 'href')
            .then((href) => {
                cy.visit(href)
            })
        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    it('should verify address, phone, email text and position', () => {
        cy.contains('Bengaluru, India').should('be.visible');
        cy.get('a[href^="tel:"]').should('contain.text', '+91 80560 66766')
            .and('have.css', 'color');
        cy.get('a[href^="mailto:"]').should('contain.text', 'info@pococare.com');
    });
});