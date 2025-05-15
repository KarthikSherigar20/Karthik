import login from '../../../support/login'

describe('POC Name', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('POC Name', () => {
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
        cy.get('input[placeholder="POC Name"]').should('not.be.disabled')
          .type('Abcd')
        cy.wait(1500);
        cy.get('input[placeholder="POC Name"]').should('have.value', 'Abcd');
        cy.wait(1500);
        cy.get('input[placeholder="POC Name"]').clear().should('have.value', '');
      }
    })
  })
})