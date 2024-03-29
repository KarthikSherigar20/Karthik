import url from 'D:/Cypress/cypress3/cypress/fixtures/urls.json';

describe('Login',()=>{
    it('Checking login page',()=>{
        const selectedEnvironment=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironment];


        cy.visit(selectUrl);
        cy.wait(1500);
        const name='Login';
        cy.contains(name).should('be.visible').scrollIntoView();
        cy.wait(1500);
        cy.contains(name).click();
        cy.wait(1500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('Login to your Pococare account now!');
        })
    })
})