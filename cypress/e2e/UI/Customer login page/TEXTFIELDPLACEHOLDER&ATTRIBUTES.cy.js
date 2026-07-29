import url from "../../../fixtures/urls.json"

describe('TEXTFIELDPLACEHOLDER&ATTRIBUTES', () => {
    beforeEach(() => {
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
    });
    it('should assert input field placeholders and types', () => {
        cy.get('input[placeholder="Phone number"]').should('exist').and('be.visible');
        cy.get('input[placeholder="Email"]').should('exist'); // may be disabled until phone OR email flow chosen
    });
});