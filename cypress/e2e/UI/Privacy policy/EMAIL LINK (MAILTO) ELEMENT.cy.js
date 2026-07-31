import url from "../../../fixtures/urls.json"

describe('EMAIL LINK (MAILTO) ELEMENT', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.contains('"Privacy Policy"')
            .should('have.attr', 'href')
            .then((href) => {
                cy.visit(href);
            });
        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    // 3. EMAIL LINK (MAILTO) ELEMENT
    it('Validates the Contact Email Link', () => {
        // Corrected locator based on the actual href attribute present on the page
        cy.get('a[href="mailto:info@pococare.com"]').as('emailLink');

        // Presence & Visibility
        cy.get('@emailLink').should('exist').and('be.visible');

        // Content check
        cy.get('@emailLink').invoke('text')
            .then((text) => {
                expect(text.trim()).to.equal('info@pococare.com');
            })

        // Box Model and Styles (Using the callback method to avoid subject chaining errors)
        cy.get('@emailLink').should(($el) => {
            expect($el).to.have.css('display');
            expect($el).to.have.css('padding');
            expect($el).to.have.css('color');
        });
    });
});