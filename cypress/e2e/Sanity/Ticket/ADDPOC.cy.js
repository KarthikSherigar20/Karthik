import login from '../../../support/login'

describe('Add Poc', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('Add Poc', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {

        cy.contains('New').click();

        cy.get('button[class="button undefined selectPoc_btn__tud4A"]').scrollIntoView().should('be.visible').should('not.be.disabled');

        cy.get('label[title="POC Name"],label[title="POC Mobile"],input[placeholder="POC Name"],input[placeholder="POC Mobile"]').should('not.exist');

        cy.get('button[class="button undefined selectPoc_btn__tud4A"]').click();

        cy.get('label[title="POC Name"]').should('be.visible');

        cy.get('label[title="POC Mobile"]').should('be.visible')

        cy.get('input[placeholder="POC Name"]').should('be.visible').should('not.be.disabled');

        cy.get('input[placeholder="POC Mobile"]').should('be.visible').should('not.be.disabled');

        cy.contains('Close').click();

        cy.get('label[title="POC Name"],label[title="POC Mobile"],input[placeholder="POC Name"],input[placeholder="POC Mobile"]').should('not.exist');

      }
    })
  })
})