import login from "../../../support/login";

describe('QRCode Scan',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login();
        }).then(() => {
          cy.log('Login completed');
        });
      })

    it('QRCode Scan',()=>{
        cy.get('body').then(($bodyText)=>{
          const bodyText=$bodyText.text();
          if(bodyText.includes('New')){
            cy.wait(1500);
            cy.contains('New').click();
            cy.wait(2000);
            cy.get('p[class="text ticketBasicDetails_value__wibkg"]').eq(1).should('contain','QR Code Scan');
          }
        })
    })
})