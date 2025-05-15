import login from "../../../support/login";

describe('Stretcher', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('Stretcher', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {
        cy.wait(1500);
        cy.contains('New').click();
        cy.wait(2000);
        cy.contains('Stretcher').scrollIntoView().should('not.be.disabled')
          .click();
        cy.wait(1500);
        cy.get('input[value="stretcher"]').should('be.checked');
        cy.wait(1500);
        cy.get('input[value="stretcher"]').click();
        cy.wait(1500);
        cy.get('input[value="stretcher"]').should('not.be.checked');
      }
    })
  })
})