import url from '../../../fixtures/urls.json';

describe('P&P',()=>{
    it('Checking P&P page',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];


        cy.visit(selectUrl);
        cy.wait(1500);
        cy.contains('Login').click();
        cy.wait(1500);
        cy.contains('Privacy Policy.').invoke('removeAttr','target').click();
        cy.wait(1500);
        cy.get('body').contains('THE POLICY').should('exist');

    })
})