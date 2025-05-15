import login from '../../../support/login'

describe('Paramedic', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('Paramedic', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {
        cy.wait(1500);
        cy.contains('New').click();
        cy.wait(2000);
        cy.contains('Paramedic').scrollIntoView().should('not.be.disabled')
          .click();
        cy.wait(1500);
        cy.get('input[value="paramedic"]').should('be.checked');
        cy.wait(1500);
        cy.get('input[value="paramedic"]').click();
        cy.wait(1500);
        cy.get('input[value="paramedic"]').should('not.be.checked');
      }
    })
  })
})