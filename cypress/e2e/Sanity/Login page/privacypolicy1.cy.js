import url from '../../../fixtures/urls.json';

describe('T&C',()=>{
    it('Checking T&C page',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];


        cy.visit(selectUrl);
        cy.wait(1500);
        const name='Login';
        cy.contains(name).should('be.visible').scrollIntoView();
        cy.wait(1500);
        cy.contains(name).click();
        cy.wait(1500);
        cy.wait(1500);
        cy.contains('Terms & Conditions').invoke('removeAttr','target').click();
        cy.get('body').contains('ANNEXURE A: TERMS OF USE').should('exist');
        cy.wait(2000);
        cy.contains('Privacy Policy').click();
        cy.wait(2000);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('THE POLICY');
        })

    })
})