import url from '../../../fixtures/urls.json';

describe('T&C', () => {
    it('Checking T&C page', () => {
        const selectedEnvironments = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironments];


        cy.visit(selectUrl);
        cy.wait(1500);
        cy.wait(1500);
        cy.contains('"Terms & Conditions"')
            .should('have.attr', 'href')
            .then((href) => {
                cy.visit(href);
            });
        cy.wait(1500);
        cy.get('body').should('contain', 'ANNEXURE A: TERMS OF USE');
    })
})