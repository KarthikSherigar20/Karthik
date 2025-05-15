import login from '../../support/login';

describe('Location', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('Location', () => {
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
        cy.contains('Add New Location').scrollIntoView().click();
        cy.wait(2000);
        cy.contains('Save Changes').click();
        cy.wait(1500);
        cy.on('window:alert', (alerttext) => {
          expect(alerttext).to.equal('Please Select the Ambulance & lift field || enter the AddressLine 1');
        })
        cy.get('span[aria-label="close"]').click();
        cy.wait(2000);
        cy.get('input[name="addressSelection"]').eq(0).click();
        cy.wait(2000);
        cy.get('input[type="radio"]').eq(0).click();
        cy.wait(2000);
        cy.contains('Start Emergency').click();
        cy.wait(2000);
      }
    })
  })
})

