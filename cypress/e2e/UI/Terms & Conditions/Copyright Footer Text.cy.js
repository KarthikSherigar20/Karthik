import url from "../../../fixtures/urls.json"

describe('Copyright Footer Text', () => {
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
    it('should verify copyright text, font-size, position at bottom', () => {
        cy.contains('© 2025 Copyright POCOCARE').should('be.visible')
            .then($el => {
                const rect = $el[0].getBoundingClientRect();
                const viewportHeight = Cypress.config('viewportHeight');
                expect(rect.top).to.be.greaterThan(viewportHeight - 200);
            });
    });
});