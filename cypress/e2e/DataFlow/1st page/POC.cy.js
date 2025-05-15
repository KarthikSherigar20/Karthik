import login from "../../../support/login";

describe('Add Poc - Errormsg', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('Add Poc - Errormsg', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {
        cy.wait(1500);
        cy.contains('New').click();
        cy.wait(2000);
        cy.get('input[class="radioButton_radio__Dmg-B"]').eq(3).scrollIntoView().click();
        cy.wait(2000);
        cy.get('label[class="radioButton_label__jC0Qn"]').eq(7).invoke('text').then((text) => {
          expect(text.trim()).to.not.equal('');
        })
      }
    })
  })
})