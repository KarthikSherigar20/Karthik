import url from "../../../fixtures/urls.json"

describe('Page Title "Terms and Conditions"', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.contains('"Terms & Conditions"')
            .should('have.attr', 'href')
            .then((href) => {
                cy.visit(href)
            })
        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    it('should verify main heading text, color, size, position', () => {
        cy.contains('h1', 'Terms').should('be.visible')
            .and('have.css', 'color')
            .then(color => {
                expect(color).to.not.be.empty;
            });
        cy.contains('h1', 'Terms').should('have.css', 'font-size');
        cy.contains('h1', 'Terms').then($el => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.be.greaterThan(0);
        });
    });
});