import login from "../../support/login";

describe('Notes', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('Notes', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {
        cy.wait(1500);
        cy.contains('New').click();
        cy.wait(1500);
        cy.contains('Comment').click();
        cy.wait(1500);
        cy.get('button[class="button undefined agentNotes_button__weDMB"]').scrollIntoView().click();
        cy.wait(1500);
        cy.get('body').should('contain', 'Please Enter the Notes');
      }
    })
  })
})