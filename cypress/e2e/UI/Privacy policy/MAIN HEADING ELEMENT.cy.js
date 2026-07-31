import url from "../../../fixtures/urls.json"

describe('MAIN HEADING ELEMENT', () => {
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
    it('Validates the Main "Privacy Policy" Heading', () => {
        // Locator
        cy.contains('h1, h2', 'Privacy Policy').first().as('mainHeading');

        // DOM Presence and Visibility
        cy.get('@mainHeading').should('exist').and('be.visible');

        // Content and Attributes
        cy.get('@mainHeading').should('have.text', 'Privacy  Policy'); // Cleaned up double space
        cy.get('@mainHeading').invoke('attr', 'class').should('exist');

        // Typography
        // Re-querying the alias (@mainHeading) for each assertion prevents the Chai-jQuery subject error
        cy.get('@mainHeading').should('have.css', 'font-family');
        cy.get('@mainHeading').should('have.css', 'font-size');   // Recommend adding expected value: , '32px'
        cy.get('@mainHeading').should('have.css', 'font-weight'); // Recommend adding expected value: , '700'
        cy.get('@mainHeading').should('have.css', 'color');
        cy.get('@mainHeading').should('have.css', 'text-align');

        // Layout, Box Model, and Position
        cy.get('@mainHeading').should('have.css', 'background-color');
        cy.get('@mainHeading').should('have.css', 'margin');
        cy.get('@mainHeading').should('have.css', 'padding');
        cy.get('@mainHeading').should('have.css', 'opacity', '1');
        cy.get('@mainHeading').should('have.css', 'border-radius');

        // Positional Coordinates (Requires yielding the element's bounding client rect)
        cy.get('@mainHeading').then(($el) => {
            const rect = $el[0].getBoundingClientRect();

            // Expect the X coordinate to be exactly 0 (usually safe for full-width elements)
            expect(rect.x).to.equal(0);

            // Expect Y to be around 208px, with a 5px tolerance (accepts 203 to 213)
            expect(rect.y).to.be.closeTo(208, 5);

            // Expect Width to be around 983px, with a 10px tolerance
            expect(rect.width).to.be.closeTo(983, 10);

            // Expect Height to be around 40px, with a 2px tolerance
            expect(rect.height).to.be.closeTo(40, 2);
        });
    });
});