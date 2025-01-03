import login from "../../support/login";

describe('Pocname',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login();
        }).then(() => {
          cy.log('Login completed');
        });
      })

    it('Pocname',()=>{
        cy.get('body').then(($bodyText)=>{
          const bodyText=$bodyText.text();
          if(bodyText.includes('New')){
            cy.wait(1500);
            cy.contains('New').click();
            cy.wait(2000);
            cy.contains('Add Poc').scrollIntoView().click();
            cy.wait(1500);
            cy.get('input[placeholder="POC Name"]').type('ABCD');
            cy.wait(1500);
            cy.get('input[placeholder="POC Name"]').clear();
            cy.wait(1500);
            cy.get('body').should('contain','POC Name is required!');
          }
        })
    })
})