import url from "../../../fixtures/urls.json"

describe('HYPERLINK ELEMENT', () => {
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
    it('Validates the "Skip to main content" Navigation Link', () => {
        // Locator
        cy.contains('a', 'Skip to main content').as('skipLink');

        // DOM & Visibility
        cy.get('@skipLink').should('exist').and('be.visible');

        // Link URL & Attributes
        cy.get('@skipLink').should('have.attr', 'href', '#content');

        // Interaction States (Focus)
        cy.get('@skipLink').focus().should('have.css', 'outline');

        // Typography & Color
        cy.get('@skipLink').should(($el) => {
            // Here, $el represents the raw DOM element. We use Chai-jQuery assertions.
            expect($el).to.have.css('background-color', 'rgb(255, 255, 255)');
            expect($el).to.have.css('color'); // You can omit the value if you just want to check it exists
            expect($el).to.have.css('border-color');
        });
    });
});