import login from "../../../support/login";

describe('Wheelchair',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login();
        }).then(() => {
          cy.log('Login completed');
        });
      });

    it('Wheelchair',()=>{
      cy.get('body').then(($bodyText)=>{
        const bodyText=$bodyText.text();
        if(bodyText.includes('New')){

          
          cy.wait(1500);
          cy.contains('New').click();
          cy.wait(2000);
          cy.contains('Wheelchair').scrollIntoView().should('not.be.disabled')
          .click();
          cy.wait(1500);
          cy.get('input[value="wheelChair"]').should('be.checked');
          cy.wait(1500);
          cy.get('input[value="wheelChair"]').click();
          cy.wait(1500);
          cy.get('input[value="wheelChair"]').should('not.be.checked');
          
        }
      })


    })
})