import login from '../../../support/login';

describe('Emergency-May', () => {

  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('Emergency-May', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {

        cy.wait(1500);
        cy.contains('New').click();
        cy.wait(2000);
        cy.contains('Maybe').click();
        cy.wait(2000);
        cy.get('body').then(($bodyText) => {
          const bodyText = $bodyText.text();
          expect(bodyText.includes("We will assume it's an emergency, capture necessary details, and arrange for a doctor's consultation. Post that, you can decide whether you need an ambulance or not. ok?")).to.be.true;
        })
      }
    })
  })
})

