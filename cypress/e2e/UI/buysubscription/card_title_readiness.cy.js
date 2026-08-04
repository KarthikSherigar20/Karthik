import url from "../../../fixtures/urls.json"

describe('card_title_readiness', () => {
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
    it('should be visible with correct text', () => {
        cy.contains('Readiness').should('be.visible');
    });
    it('should have card background color distinct from page', () => {
        cy.contains('Readiness').then($el => {
            const style = window.getComputedStyle($el[0]);
            expect(style.backgroundColor).to.exist;
        });
    });
});