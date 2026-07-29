import url from "../../../fixtures/urls.json"

describe('Checkboxes', () => {
    beforeEach(() => {
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
    });
    // 1. CHECKBOX
    it('should assert the terms checkbox exists and toggles correctly', () => {
        cy.get('input[type="checkbox"], [role="checkbox"]').first()
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'checked'); // default checked state

        cy.get('input[type="checkbox"], [role="checkbox"]').first()
            .click({ force: true })
            .should('not.have.attr', 'not.be.checked');
    });

});