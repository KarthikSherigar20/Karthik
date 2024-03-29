import url from 'D:/Cypress/cypress3/cypress/fixtures/urls.json';

describe('T&C',()=>{
    it('Checking T&C page',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];

        cy.visit(selectUrl);
        cy.wait(1500);
        cy.contains('terms and conditions').should('be.visible').scrollIntoView();
        cy.wait(1500);
        cy.contains('terms and conditions').click();
        cy.wait(1500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('ANNEXURE A: TERMS OF USE');
        })
    })
})