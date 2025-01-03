import login from '../../../support/login';

describe('Emergency-No',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login();
        }).then(() => {
          cy.log('Login completed');
        });
      })
         
it('Emergency-No',()=>{
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
      })
    }
    })
})
})

