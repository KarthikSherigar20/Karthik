import login from '../../../support/login';

describe('Insurance details', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  
  it('Insurance details', () => {
    cy.get('body').then(($bodyText)=>{
      const bodyText=$bodyText.text();
      if(bodyText.includes('New')){

        cy.wait(2000);
        
        cy.contains('New').should('be.visible');
        
        // Continue with the test steps on the original domain
        cy.contains('New').click();
        cy.contains('No').click();
        
        cy.get('body').then(($body) => {
          const bodyText = $body.text();
          expect(bodyText.includes("Relieved and happy to know that it is not a medical emergency, is there anything I could assist you with ?")).to.be.true;
        });

        cy.get('button[class="button undefined selectOption_btn__MUg8+"]')
        .eq(0)
        .should('exist')
        .and('be.enabled')
        .click();
        
        cy.get('button[class="button undefined selectOption_btn_option__UwXY7"]')
        .eq(0)
        .should('exist')
        .and('be.visible');
      }
    })
      });
    });
    