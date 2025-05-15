import login1 from '../../support/login1';

describe('Meeting link-Mobile no not given', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login1();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('Meeting link-Mobile no not given', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {

        cy.wait(1500);
        cy.contains('New').click();
        cy.wait(2000);
        cy.get('input[class="radioButton_radio__Dmg-B"]').eq(3).scrollIntoView().click();
        cy.wait(2000);
        cy.get('input[class="radioButton_radio__Dmg-B"]').eq(7).scrollIntoView().click();
        cy.wait(2000);
        cy.contains('Save Assessment').scrollIntoView().click();
        cy.wait(2000);
        cy.get('input[name="addressSelection"]').eq(0).click();
        cy.wait(2000);
        cy.get('input[type="radio"]').eq(0).click();
        cy.wait(2000);
        cy.contains('Start Emergency').click();
        cy.wait(2000);
        cy.contains('Send Meeting Link').click();
        cy.wait(2000);
        cy.on('window:alert', (alerttext) => {
          expect(alerttext).to.equal('Please select doctor or add custom doctor numbers');
        })

      } else {
        cy.contains('Send Meeting Link').click();
        cy.wait(2000);
        cy.on('window:alert', (alerttext) => {
          expect(alerttext).to.equal('Please select doctor or add custom doctor numbers');
        })
      }
    })
  })
})

