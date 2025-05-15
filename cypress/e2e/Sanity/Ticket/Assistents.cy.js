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
        cy.wait(1500);
        cy.contains('New').click();

        cy.get('input[value="wheelChair"]').scrollIntoView().should('not.be.checked');

        cy.get('input[value="wheelChair"]').click();

        cy.get('input[value="wheelChair"]').scrollIntoView().should('be.checked');

        cy.get('input[value="wheelChair"]').click();

        cy.get('input[value="wheelChair"]').scrollIntoView().should('not.be.checked');

        cy.get('input[value="stretcher"]').scrollIntoView().should('not.be.checked');

        cy.get('input[value="stretcher"]').click();

        cy.get('input[value="stretcher"]').scrollIntoView().should('be.checked');

        cy.get('input[value="stretcher"]').click();

        cy.get('input[value="stretcher"]').scrollIntoView().should('not.be.checked');

        cy.get('input[value="paramedic"]').scrollIntoView().should('not.be.checked');

        cy.get('input[value="paramedic"]').click();

        cy.get('input[value="paramedic"]').scrollIntoView().should('be.checked');

        cy.get('input[value="paramedic"]').click();

        cy.get('input[value="paramedic"]').scrollIntoView().should('not.be.checked');

        cy.get('input[value="additionalHelp"]').scrollIntoView().should('not.be.checked');

        cy.get('input[value="additionalHelp"]').click();

        cy.get('input[value="additionalHelp"]').scrollIntoView().should('be.checked');

        cy.get('input[value="additionalHelp"]').click();

        cy.get('input[value="additionalHelp"]').scrollIntoView().should('not.be.checked');
      }
    })
  })
})