import login from "../../support/login";

describe('Doctorconsultation-No', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('Doctorconsultation-No', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {
        cy.wait(1500);
        cy.contains('New').click();
        cy.wait(2000);
        cy.get('input[name="isDoctorConsultationRequired"]').eq(1).scrollIntoView().should('be.disabled');
      }
    })
  })
})