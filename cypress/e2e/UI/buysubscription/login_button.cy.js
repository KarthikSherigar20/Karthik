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
            .closest('[aria-haspopup]') // walk up to the actual popover trigger element
            .should('have.attr', 'aria-haspopup', 'dialog');
    });
    it('should be clickable and open the dropdown menu', () => {
        cy.contains('Login').click();
        // No role="dialog" exists; instead the menu items appear
        cy.contains('Corporate Login').should('be.visible');
        cy.contains('Customer Login').should('be.visible');
    });

    it('should have expected background color and border radius on the Login link', () => {
        cy.contains('Login').then($el => {
            const style = window.getComputedStyle($el[0]);
            expect(style.backgroundColor).to.not.be.empty;
            expect(parseInt(style.borderRadius)).to.equal(0); // corrected: inner <a> has no radius itself
        });
    });


    it('should contain a lock icon and a dropdown chevron icon', () => {
        cy.contains('Login').parent().within(() => {
            cy.get('svg').should('have.length.at.least', 2); // lock icon + chevron icon
        });
    });
});