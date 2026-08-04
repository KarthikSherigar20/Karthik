import url from "../../../fixtures/urls.json"

describe('toggle_navigation_button', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.wait(1000);
        cy.contains('Buy Subscription').scrollIntoView().click();
        cy.wait(500);
        cy.contains('Get Started').scrollIntoView().click();
        cy.viewport(375, 667);

        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    it('should be visible and enabled', () => {
        cy.get('button[aria-label="Toggle Navigation"]')
            .should('be.visible')
            .and('not.be.disabled');
    });

    it('should have correct computed styles', () => {
        cy.get('button[aria-label="Toggle Navigation"]').then($btn => {
            const style = window.getComputedStyle($btn[0]);
            expect(style.cursor).to.eq('pointer');
            expect(style.display).to.not.eq('none');
        });
    });

    it('should respond to hover state', () => {
        cy.get('button[aria-label="Toggle Navigation"]').trigger('mouseover');
    });

    it('should be clickable and toggle mobile menu open', () => {
        cy.get('button[aria-label="Toggle Navigation"]').click();
        // Assert mobile nav links become visible after click
        cy.contains('About Us').should('be.visible');
    });
});