import url from "../../../fixtures/urls.json"

describe('Menu Toggle (Hamburger Icon)', () => {
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
    it('Verifies Menu Toggle Icon (hardened)', () => {
        cy.get('.hfe-nav-menu-icon').eq(0)
            .should('be.visible')
            .and('have.css', 'color', 'rgb(254, 29, 143)')
            .and('have.css', 'cursor', 'pointer')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    });

    it('Verifies Menu Toggle opens navigation on click', () => {
        cy.get('.hfe-nav-menu-icon').eq(0).click();

        cy.contains('a', 'About Us').should('be.visible');
        cy.contains('a', 'Request a demo').should('be.visible');
    });
});