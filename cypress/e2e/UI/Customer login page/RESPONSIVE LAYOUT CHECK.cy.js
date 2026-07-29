import url from "../../../fixtures/urls.json"

describe('RESPONSIVE LAYOUT CHECK', () => {
    beforeEach(() => {
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
    });
    it('should assert layout adapts correctly on mobile viewport', () => {
        cy.viewport('iphone-x');
        cy.contains('Medical Emergency').should('be.visible');
        cy.get('input[placeholder="Phone number"]').should('be.visible');
    });
});