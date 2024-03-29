import url from 'D:/Cypress/cypress3/cypress/fixtures/urls.json';
describe('Privacypolicy',()=>{
    it('checking P&P page ',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];


        cy.visit(selectUrl);
        cy.wait(1500);
        cy.contains('privacy policy').should('be.visible').scrollIntoView();
        cy.wait(1500);
        cy.contains('privacy policy').click();
        cy.wait(1500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('THE POLICY');
        })
    })
})