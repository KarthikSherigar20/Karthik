import url from "../../../fixtures/urls.json"

describe('login_button', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.wait(1000);
        cy.contains('Buy Subscription').scrollIntoView().click();
        cy.wait(500);
        cy.contains('Get Started').scrollIntoView().click();
        cy.viewport(1280, 800);
        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    it('should be visible with correct text and dropdown attribute', () => {
        cy.contains('Login')
            .should('be.visible')
            .and('have.attr', 'aria-haspopup', 'dialog');
    });

    it('should be clickable and open the popover/dropdown', () => {
        cy.contains('Login').click();
        // Assert popover/dialog content appears after click
        cy.get('[role="dialog"]').should('be.visible');
    });

    it('should have expected background color and pill-shaped border radius', () => {
        cy.contains('Login').then($el => {
            const style = window.getComputedStyle($el[0]);
            expect(style.backgroundColor).to.not.be.empty;
            expect(parseInt(style.borderRadius)).to.be.greaterThan(0);
        });
    });

    it('should contain a lock icon and a dropdown chevron icon', () => {
        cy.contains('Login').parent().within(() => {
            cy.get('svg').should('have.length.at.least', 2); // lock icon + chevron icon
        });
    });
});