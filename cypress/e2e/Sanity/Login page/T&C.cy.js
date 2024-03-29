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
        // cy.contains('Terms & Conditions').click();

        // cy.window().then((parentWindow)=>{
        //     parentWindow.addEventListener('beforeunload',()=>{
        //         const childUrl=parentWindow.location.href;

        //         cy.visit(childUrl);
        //         cy.get('body').contains('ANNEXURE A: TERMS OF USE').should('exist');
        //     })
        // })
        
        cy.get('body').contains('ANNEXURE A: TERMS OF USE').should('exist');

    })
})