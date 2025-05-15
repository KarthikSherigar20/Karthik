import login from '../../../support/login'

describe('radiobuttons', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('radiobuttons', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {
        cy.wait(1500);
        cy.contains('New').click();
        cy.wait(1500);
        cy.contains('Select Patient Condition').scrollIntoView().should('not.be.disabled').should('exist')
          .click({ force: true });
        cy.wait(1500);
        cy.get('body').should(($body) => {
          expect($body).to.contain('Accident');
          expect($body).to.contain('Bleeding');
          expect($body).to.contain('Breathing Difficulty');
          expect($body).to.contain('Burn');
          expect($body).to.contain('Severe Pain');
          expect($body).to.contain('Other');
        })
        cy.wait(1500);
        cy.get('input[placeholder="Enter Others"]').should('not.be.disabled').should('be.visible');
      }
    })
  })
})