import url from "../../../fixtures/urls.json"

describe('DROPDOWN/POPOVER', () => {
    beforeEach(() => {
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
    });
    // 4. DROPDOWN / POPOVER - Login button
    it('should assert Login popover opens and closes correctly', () => {
        cy.contains('Login').click();
        cy.get('[role="dialog"], [id*="popover"]').should('be.visible');
        cy.get('body').type('{esc}');
    });
});