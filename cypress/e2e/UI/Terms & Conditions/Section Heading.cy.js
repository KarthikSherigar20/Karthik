import url from "../../../fixtures/urls.json"

describe('Section Heading', () => {
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
    describe('Annexure A Heading', () => {
        it('should assert heading style and location', () => {
            cy.contains('ANNEXURE A: TERMS OF USE').should('be.visible')
                .and('have.css', 'font-weight')
                .and('match', /bold|700/);
            cy.contains('ANNEXURE A: TERMS OF USE').should('have.css', 'color');
        });
    });
});