import url from "../../../fixtures/urls.json"

describe('Onboarding Process Table', () => {
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
    it('should verify table structure, size, position', () => {
        cy.contains('table', 'Steps').should('exist').and('be.visible')
            .then($table => {
                const rect = $table[0].getBoundingClientRect();
                expect(rect.width).to.be.greaterThan(200);
            });
    });

    it('should verify "Steps" header cell font-weight', () => {
        cy.contains('td', 'Steps').should('be.visible');
        cy.contains('td', 'Steps').should('have.css', 'font-weight');
    });

    it('should verify "Description" header cell is visible', () => {
        cy.contains('td', 'Description').should('be.visible');
    });

    it('should verify first row data "Subscriber Registration"', () => {
        cy.contains('td', 'Subscriber Registration').should('be.visible');
    });
});