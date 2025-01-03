import login from '../../../support/login'

describe('Add Poc',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login();
        }).then(() => {
          cy.log('Login completed');
        });
      })

    it('Add Poc',()=>{
        cy.get('body').then(($bodyText)=>{
          const bodyText=$bodyText.text();
          if(bodyText.includes('New')){
            cy.wait(1500);
            cy.contains('New').click();
            cy.wait(2000);
            cy.contains('Add Poc').scrollIntoView()
            .should('be.visible').click();
            cy.wait(2000);
            cy.get('body').then(($bodyText)=>{
              const bodyText=$bodyText.text()
              expect(bodyText.includes('POC Name')).to.be.true;
              expect(bodyText.includes('POC Mobile')).to.be.true;
            })
          }
        })
    })
})