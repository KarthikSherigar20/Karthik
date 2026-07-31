import url from "../../../fixtures/urls.json"

describe('Form Input Fields (Name, Email, Phone)', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.contains('Contact Us').scrollIntoView().click();
        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    it('Verifies the Full Name input field properties (hardened)', () => {
        cy.get('input[type="text"]').eq(0)
            .should('be.visible')
            .and('have.class', 'wpcf7-validates-as-required')
            .and('have.class', 'form-style')
            .and('have.css', 'padding', '19px 0px')
            .and('have.css', 'border-radius', '0px')
            .and('have.css', 'color', 'rgb(0, 0, 0)')
            .and('have.css', 'font-size', '16px');
    });

    it('Verifies the Email input field properties', () => {
        cy.get('input[type="email"]')
            .should('be.visible')
            .and('have.class', 'wpcf7-validates-as-required')
            .and('have.class', 'wpcf7-validates-as-email')
            .and('have.class', 'form-style')
            .and('have.css', 'padding', '19px 0px')
            .and('have.css', 'border-radius', '0px');
    });
    it('Verifies the Phone Number input field properties (hardened)', () => {
        cy.get('input[type="tel"]')
            .should('be.visible')
            .and('have.class', 'wpcf7-validates-as-required')
            .and('have.class', 'wpcf7-validates-as-tel')
            .and('have.class', 'form-style')
            .and('have.css', 'padding', '19px 0px')
            .and('have.css', 'border-radius', '0px')
            .and('have.css', 'color', 'rgb(0, 0, 0)')
            .and('have.css', 'font-size', '16px');
    });
});