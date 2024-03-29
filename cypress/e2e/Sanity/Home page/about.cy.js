import url from 'D:/Cypress/cypress3/cypress/fixtures/urls.json';

describe('About',()=>{
    it('Checking about page',()=>{
        const selectEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectEnvironments];


        cy.visit(selectUrl);
        cy.wait(1500);
        const name='About';
        cy.contains(name).should('be.visible').scrollIntoView();
        cy.wait(1500);
        cy.contains(name).click();
        cy.wait(1500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('About Us');
        })

    })
})