import url from "../../../fixtures/urls.json"

describe('formvalidation', () => {
    beforeEach(() => {
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
    });
    it('should assert Get OTP button is disabled by default and enables on valid phone entry', () => {
        cy.contains('button', 'Get OTP').should('be.disabled');

        cy.get('input[placeholder="Phone number"]').type('9876543210');
        cy.contains('button', 'Get OTP').should('not.be.disabled');
    });

});