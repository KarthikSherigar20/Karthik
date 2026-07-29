import url from "../../../fixtures/urls.json"

describe('COUNTRYCODEDROPDOWN', () => {
    beforeEach(() => {
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
    });
    // 5. COUNTRY CODE DROPDOWN
    it('should assert country dropdown opens with India as default', () => {
        cy.get('[aria-haspopup="menu"]').first().click();
        cy.contains('IN').should('be.visible');
        cy.contains('+91').should('be.visible');
        cy.get('body').type('{esc}');
    });
});