import login1 from '../../support/login1';
import num from '../../fixtures/Number.json';

describe('patientprofile', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login1();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('patientprofile', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {

        cy.wait(1500);
        cy.contains('New').click();
        cy.wait(2000);
        cy.get('input[class="radioButton_radio__Dmg-B"]').eq(3).scrollIntoView().click();
        cy.wait(2000);
        cy.get('input[class="radioButton_radio__Dmg-B"]').eq(8).scrollIntoView().click();
        cy.wait(2000);
        cy.contains('Save Assessment').scrollIntoView().click();
        cy.wait(2000);
        cy.get('input[name="addressSelection"]').eq(0).click();
        cy.wait(2000);
        cy.get('input[type="radio"]').eq(0).click();
        cy.wait(2000);
        cy.contains('Start Emergency').click();
        cy.wait(2000);
        cy.get('input[placeholder="Doctor Name"]').type(num.DocName)
        cy.wait(2000);
        cy.contains('Share Patient’s Profile').click();
        cy.wait(2000);
        cy.get('body').should('contain', 'Please Enter Doctor Details');
      } else {
        cy.wait(2000);
        cy.get('input[placeholder="Doctor Name"]').type(num.DocName)
        cy.wait(2000);
        cy.contains('Share Patient’s Profile').click();
        cy.wait(2000);
        cy.get('body').should('contain', 'Please Enter Doctor Details');
      }
    })
  })
})

