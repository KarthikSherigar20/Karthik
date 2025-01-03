import login3 from "../../../support/login3-cqr";

describe('Company QRCode Scan',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login3();
        }).then(() => {
          cy.log('Login completed');
        });
      })

    it('Company QRCode Scan',()=>{
        cy.get('body').then(($bodyText)=>{
          const bodyText=$bodyText.text();
          if(bodyText.includes('New')){
            cy.wait(1500);
            cy.contains('New').click();
            cy.wait(2000);
            cy.get('p[class="text ticketBasicDetails_value__wibkg"]').eq(1).should('contain','Company QR Code Scan');
          }
        })
    })
})