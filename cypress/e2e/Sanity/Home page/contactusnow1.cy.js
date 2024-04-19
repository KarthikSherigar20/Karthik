import url from 'D:/Cypress/cypress3/cypress/fixtures/urls.json';

describe('contact us now',()=>{
    it('checking CUN page',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];


        cy.visit(selectUrl);
        cy.wait(1500);
        const name='Contact us Now';
        cy.contains(name).should('be.visible').scrollIntoView();
        cy.wait(1500);
        cy.contains(name).click();
        cy.wait(1500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('Send Message');
            cy.get('input[placeholder="Name"]').should('be.visible').should('not.be.disabled');
            cy.wait(1000);
            cy.get('input[placeholder="Email"]').should('be.visible').should('not.be.disabled');
            cy.wait(1000);
            cy.get('input[placeholder="Phone Number"]').should('be.visible').should('not.be.disabled');
            cy.wait(1000);
            cy.get('input[placeholder="Subject"]').should('be.visible').should('not.be.disabled');
            cy.wait(1000);
            cy.get('textarea[placeholder="message"]').should('be.visible').should('not.be.disabled');
            cy.wait(1000);
            cy.contains('Send Message').should('be.visible').should('not.be.disabled');
        })
    })
})