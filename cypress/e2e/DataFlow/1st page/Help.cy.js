import login from '../../../support/login'

describe('Help',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login();
        }).then(() => {
          cy.log('Login completed');
        });
      })

    it('Help',()=>{
       cy.get('body').then(($bodyText)=>{
        const bodyText=$bodyText.text();
        if(bodyText.includes('New')){
          cy.wait(1500);
          cy.contains('New').click();
          cy.wait(2000);
          cy.contains('Help').scrollIntoView().should('not.be.disabled')
          .click();
          cy.wait(1500);
          cy.get('input[value="additionalHelp"]').should('be.checked');
          cy.wait(1500);
          cy.get('input[value="additionalHelp"]').click();
          cy.wait(1500);
          cy.get('input[value="additionalHelp"]').should('not.be.checked');
        }
       })
    })
})