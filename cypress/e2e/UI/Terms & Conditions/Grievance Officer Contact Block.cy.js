import url from "../../../fixtures/urls.json"

describe('Grievance Officer Contact Block', () => {
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
    it('should verify name and mailto link', () => {
        cy.contains('Amitav Ash').should('be.visible');
        cy.get('a[href="mailto:amitav.a@pococare.com"]').should('be.visible')
            .and('have.attr', 'href', 'mailto:amitav.a@pococare.com');
    });
});