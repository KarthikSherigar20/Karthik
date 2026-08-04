import url from "../../../fixtures/urls.json"

describe('card_bullet_readiness', () => {
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
        cy.contains('Personalized Emergency Response Plan').should('be.visible');
    });
    it('should be visible with full text', () => {
        cy.contains('24/7 Access to Medical Experts').should('be.visible');
    });
    it('should be visible with full text', () => {
        cy.contains('Family Member Inclusion').should('be.visible');
    });
    it('should exist in DOM (may require scroll)', () => {
        cy.contains('Emergency Contact Management').scrollIntoView().should('be.visible');
    });
});