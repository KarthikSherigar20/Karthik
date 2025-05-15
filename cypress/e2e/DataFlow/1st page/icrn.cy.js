import login4 from "../../../support/login4-icrn";

describe('Incorming Call-Registered number', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login4();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('Incorming Call-Registered number', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {
        cy.wait(1500);
        cy.contains('New').click();
        cy.wait(2000);
        cy.get('p[class="text ticketBasicDetails_value__wibkg"]').eq(1).should('contain', 'Direct');
      }
    })
  })
})