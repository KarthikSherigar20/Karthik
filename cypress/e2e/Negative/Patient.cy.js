import login from "../../support/login";

describe('Patient', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('Patient', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {
        cy.wait(1500);
        cy.contains('New').click();
        cy.wait(2000);
        cy.contains('Add Poc').scrollIntoView().click();
        cy.wait(1500);
        cy.get('input[placeholder="POC Name"]').type('ABCD');
        cy.wait(1500);
        cy.get('input[placeholder="POC Mobile"]').type('9876543215');
        cy.wait(1500);
        cy.contains('Save Assessment').scrollIntoView().click();
        cy.wait(1500);
        cy.get('body').should('contain', 'Please Select Patient');
      }
    })
  })
})