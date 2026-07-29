import url from "../../../fixtures/urls.json"

describe('PAGEMETADATA', () => {
    beforeEach(() => {
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
    });
    // 7. PAGE METADATA
    it('should assert page title and favicon', () => {
        cy.title().should('eq', 'Pococare Subscriber');
        cy.get('link[rel="icon"], link[rel="shortcut icon"]').should('have.attr', 'href');
    });
});