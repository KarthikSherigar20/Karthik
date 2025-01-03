import login from '../../../support/login'

describe('Logout',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login();
        }).then(() => {
          cy.log('Login completed');
        });
      })

    it('Logout',()=>{
        cy.get('body').then(($bodyText)=>{
          const bodyText=$bodyText.text();
          if(bodyText.includes('New')){
            cy.wait(1500);
            cy.contains('New').click();
            cy.wait(2000);
            cy.get('img[alt="Logout"]').scrollIntoView()
            .should('be.visible').click();
            cy.wait(2000);
            cy.get('body').then(($bodyText)=>{
              const bodyText=$bodyText.text();
              expect(bodyText.includes('Admin Login')).to.be.true;
            })
          }
        })
    })
})