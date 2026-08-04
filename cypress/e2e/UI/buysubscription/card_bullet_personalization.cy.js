import url from "../../../fixtures/urls.json"

describe('card_bullet_personalization', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.wait(1000);
        cy.contains('Buy Subscription').scrollIntoView().click();
        cy.wait(500);
        cy.contains('Get Started').scrollIntoView().click();
        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    it('should be visible with full text', () => {
        cy.contains('Ongoing Medical Profile Updates').should('be.visible');
    });
    it('should be visible with full text', () => {
        cy.contains('Location-Based Services').should('be.visible');
    });
    it('should be visible with full text', () => {
        cy.contains('Preference-Driven Communication').scrollIntoView().should('be.visible');
    });

});