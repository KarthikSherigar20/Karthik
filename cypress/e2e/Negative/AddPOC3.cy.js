import login from "../../support/login";

describe('Add Poc - Errormsg',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login();
        }).then(() => {
          cy.log('Login completed');
        });
      })

    it('Add Poc - Errormsg',()=>{
        cy.get('body').then(($bodyText)=>{
          const bodyText=$bodyText.text();
          if(bodyText.includes('New')){
            cy.wait(1500);
            cy.contains('New').click();
            cy.wait(2000);
            cy.get('input[class="radioButton_radio__Dmg-B"]').eq(3).scrollIntoView().click();
            cy.wait(2000);
            cy.contains('Add Poc').click();
            cy.wait(2000);
            cy.get('input[placeholder="POC Mobile"]').type('9019803837');
            cy.wait(2000);
            cy.contains('Save Assessment').scrollIntoView().click();
            cy.wait(2000);
            cy.get('body').should('contain','Please Select Poc or Enter Poc Details');
          }
        })
    })
})