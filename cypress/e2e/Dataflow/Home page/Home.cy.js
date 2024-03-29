import url from 'D:/Cypress/cypress3/cypress/fixtures/urls.json';

describe('Home',()=>{
    it('Checking home page',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];


        cy.visit(selectUrl);
        cy.wait(1500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('Medical Emergency');
        })
    
        
    })
})