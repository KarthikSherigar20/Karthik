import login2 from "../../../support/login2-eb";

describe('EmergencyButton',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login2();
        }).then(() => {
          cy.log('login completed');
        });
      })

    it('EmergencyButton',()=>{
        cy.get('body').then(($bodyText)=>{
          const bodyText=$bodyText.text();
          if(bodyText.includes('New')){
            cy.wait(1500);
            cy.contains('New').click();
            cy.wait(2000);
            cy.get('p[class="text ticketBasicDetails_value__wibkg"]').eq(1).should('contain','Emergency Button');
          }
        })
    })
})