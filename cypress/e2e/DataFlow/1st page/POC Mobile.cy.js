import login from '../../../support/login'

describe('POC Mobile', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('POC Mobile', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {
        cy.wait(1500);
        cy.contains('New').click();
        cy.wait(2000);
        cy.contains('Add Poc').scrollIntoView()
          .should('be.visible').click();
        cy.wait(2000);
        cy.get('body').then(($bodyText) => {
          const bodyText = $bodyText.text()
          expect(bodyText.includes('POC Name')).to.be.true;
          expect(bodyText.includes('POC Mobile')).to.be.true;
        })
        cy.wait(1500);
        cy.get('input[placeholder="POC Mobile"]').should('not.be.disabled')
          .type('9856589658')
        cy.wait(1500);
        cy.get('input[placeholder="POC Mobile"]').should('have.value', '9856589658');
        cy.wait(1500);
        cy.get('input[placeholder="POC Mobile"]').clear().should('have.value', '');
      }
    })
  })
})