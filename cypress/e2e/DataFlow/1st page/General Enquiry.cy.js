import login from '../../../support/login';

describe('General Enquiry',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login();
        }).then(() => {
          cy.log('Login completed');
        });
      })
      
it('General Enquiry',()=>{
cy.get('body').then(($bodyText)=>{
  const bodyText=$bodyText.text();
  if(bodyText.includes('New')){

    cy.wait(1500);
    cy.contains('New').click();
    cy.wait(2000);
    cy.contains('No').click();
    cy.wait(2000);
    cy.get('body').then(($bodyText)=>{
      const bodyText=$bodyText.text();
      expect(bodyText.includes("Relieved and happy to know that it is not a medical emergency, is there anything I could assist you with ?")).to.be.true;
      cy.wait(1500);
    })
    cy.get('button[class="button undefined selectOption_btn__MUg8+"]').should('exist').should('be.enabled');
  }
  })
})
})

