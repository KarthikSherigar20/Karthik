import url from '../../../fixtures/urls.json';

describe('Contact Us',()=>{
    it('checking CUN page',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];


        cy.visit(selectUrl);
        cy.wait(1500);
        const name='Contact Us';
        cy.contains(name).should('be.visible').scrollIntoView();
        cy.wait(1500);
        cy.contains(name).click();
        cy.wait(1500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('Submit');
            cy.get('input[placeholder="Full Name*"]').should('be.visible').should('not.be.disabled');
            cy.wait(1000);
            cy.get('input[placeholder="Email*"]').should('be.visible').should('not.be.disabled');
            cy.wait(1000);
            cy.get('input[placeholder="Phone Number"]').should('be.visible').should('not.be.disabled');
            cy.wait(1000);
            cy.get('input[placeholder="Please select a subject"]').should('be.visible').should('not.be.disabled');
            cy.wait(1000);
            cy.get('textarea[placeholder="Message"]').should('be.visible').should('not.be.disabled');
            cy.wait(1000);
            cy.contains('Submit').should('be.visible').should('not.be.disabled');
        })
    })
})