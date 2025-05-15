import login5 from "../../../support/login5-icnrn";

describe('Incorming Call-Not registered number', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login5();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('Incorming Call-Not registered number', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {
        cy.wait(1500);
        cy.contains('New').click();
        cy.wait(2000);
        cy.get('p[class="text ticketBasicDetails_value__wibkg"]').eq(1).should('contain', 'Direct');
        cy.contains('No').scrollIntoView().click();
        cy.wait(2000);
        cy.get('body').then(($bodyText) => {
          const bodyText = $bodyText.text();
          expect(bodyText).to.include('General Enquiry');
          cy.wait(2000);
          expect(bodyText).to.include('TestDemo');
        })
        cy.contains('TestDemo').scrollIntoView().click();
      }
    })
  })
})