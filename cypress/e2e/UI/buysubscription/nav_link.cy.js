import url from "../../../fixtures/urls.json"

describe('nav_link', () => {
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
    it('should be visible with correct href', () => {
        cy.contains('a', 'About').should('be.visible')
            .and('have.attr', 'href', 'https://pococare.com/about-us/');
    });
    it('should be visible with correct href', () => {
        cy.contains('a', 'Request a demo').should('be.visible')
            .and('have.attr', 'href', 'https://pococare.com/contact-us/');
    });
    it('should be visible with correct href', () => {
        cy.contains('a', 'Buy Subscription').should('be.visible')
            .and('have.attr', 'href', 'https://pococare.com/b2c/');
    });
    it('should be visible with correct href', () => {
        cy.contains('a', 'Career').should('be.visible')
            .and('have.attr', 'href', 'https://pococare.com/why-pococare/');
    });
    it('should be visible with correct href', () => {
        cy.contains('a', 'Blog').should('be.visible')
            .and('have.attr', 'href', 'https://pococare.com/blog/');
    });

});