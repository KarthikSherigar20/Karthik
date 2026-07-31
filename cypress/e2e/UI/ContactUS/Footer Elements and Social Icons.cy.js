import url from "../../../fixtures/urls.json"

describe('Footer Elements and Social Icons', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.contains('Contact Us').scrollIntoView().click();
        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    it('Verifies Footer Links and Social Media Icons', () => {
        // Check Social Media links
        const socialLinks = ['Facebook', 'Twitter', 'Instagram', 'Linkedin'];
        socialLinks.forEach((network) => {
            cy.contains(network)
                .should('be.visible')
                .and('have.css', 'font-size');
        });

        // Check App Store Badges size and visibility
        cy.get('a[href*="play.google.com"]')
            .should('be.visible')
            .and('have.css', 'display');

        cy.get('a[href*="apps.apple.com"]')
            .should('be.visible')
            .and('have.css', 'display');
    });
});