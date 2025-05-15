import login from '../../../support/login';

describe('Emergency-Yes', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })
  it('Emergency-Yes', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {
        cy.wait(1500);
        cy.contains('New').click();
        cy.wait(2000);
        cy.contains('Yes').click();
        cy.wait(2000);
        cy.get('body').then(($bodyText) => {
          const bodyText = $bodyText.text();
          expect(bodyText.includes("Please don't panic, we are here to help. We can arrange a doctor's consultation and book an ambulance. But to do that, we would need some details. Ok?")).to.be.true;
        })
      }
    })
  })
})

