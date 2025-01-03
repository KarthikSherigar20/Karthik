import login from "../../support/login";

describe('POC Mobile',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login();
        }).then(() => {
          cy.log('Login completed');
        });
      })

    it('POC Mobile',()=>{
        cy.get('body').then(($bodyText)=>{
          const bodyText=$bodyText.text();
          if(bodyText.includes('New')){
            cy.wait(1500);
            cy.contains('New').click();
            cy.wait(2000);
            cy.contains('Add Poc').scrollIntoView().click();
            cy.wait(1500);
            cy.get('input[placeholder="POC Mobile"]').type('987654656');
            cy.wait(1500);
            cy.get('body').should('contain','POC Mobile must be a valid 10-digit number');
          }
        })
    })
})