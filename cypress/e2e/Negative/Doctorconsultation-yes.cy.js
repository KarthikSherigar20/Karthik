import login from "../../support/login";

describe('Doctorconsultation-yes', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('Doctorconsultation-yes', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {
        cy.wait(1500);
        cy.contains('New').click();
        cy.wait(2000);
        cy.get('input[name="isDoctorConsultationRequired"]').eq(0).scrollIntoView().should('be.disabled');
      }
    })
  })
})