import url from "../../../fixtures/urls.json"

describe('card_bullet_response', () => {
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
        cy.contains('Immediate Emergency Assistance').should('be.visible');
    });
    it('should be visible with full text', () => {
        cy.contains('Real-Time Tracking & Coordination').should('be.visible');
    });
    it('should be visible with full text', () => {
        cy.contains('Hospital Admission Facilitation').scrollIntoView().should('be.visible');
    });
});