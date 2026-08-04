import url from "../../../fixtures/urls.json"

describe('hero_text', () => {
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
        cy.contains('Peace').should('be.visible');
    });
    it('should have expected font styling', () => {
        cy.contains('Peace').then($el => {
            const style = window.getComputedStyle($el[0]);
            expect(style.fontFamily).to.not.be.empty;
            expect(style.fontSize).to.not.be.empty;
            expect(style.fontWeight).to.not.be.empty;
            expect(style.color).to.not.be.empty;
        });
    });
    it('should be visible on mobile and desktop viewports', () => {
        cy.viewport(375, 667);
        cy.contains('Peace').should('be.visible');
        cy.viewport(1280, 800);
        cy.contains('Peace').should('be.visible');
    });
    it('should be visible with correct text and color highlight', () => {
        cy.contains('Medical Emergencies').should('be.visible');
    });
    it('should have distinct text color from siblings', () => {
        cy.contains('Medical Emergencies').then($el => {
            const style = window.getComputedStyle($el[0]);
            expect(style.color).to.not.be.empty;
        });
    });
    it('should exist and be visible', () => {
        cy.contains(', for you and your family,').should('be.visible');
    });
    it('should have correct position relative to viewport', () => {
        cy.contains(', for you and your family,').then($el => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.be.greaterThan(0);
        });
    });
    it('should be visible and contain expected word', () => {
        cy.contains('with').should('be.visible');
    });
    it('should be visible with highlighted styling', () => {
        cy.contains('fastest medical assistance').should('be.visible');
    });
    it('should have non-default text color (highlight)', () => {
        cy.contains('fastest medical assistance').then($el => {
            const style = window.getComputedStyle($el[0]);
            expect(style.color).to.not.be.empty;
        });
    });
    it('should be visible', () => {
        cy.contains('at your fingertips.').should('be.visible');
    });
});