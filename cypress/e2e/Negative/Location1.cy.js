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
        cy.wait(600);
        cy.get('div[class="container selectPatient_container__02wpR"]').find('input[name="radio"]').first().click();
        cy.wait(600);

        cy.get('div.container.selectPoc_wrapper__MBvMf', { timeout: 5000 }).then($div => {
          if ($div.find('input[name="radio"]').length > 0) {
            cy.wrap($div)
              .find('input[name="radio"]')
              .click();
          } else {
            // cy.log('Radio input not found — skipping click');
            cy.get('div[class="container ticketBasicDetails_cardWrapper__Zq72v"]').find('p[class="text phoneNumber_value__Ktlo5"]')
              .eq(1).invoke('text').then((mob) => {
                const mo = mob.trim();

                cy.wait(500);

                cy.contains('Add Poc').scrollIntoView().click();

                cy.wait(500);

                cy.get('input[placeholder="POC Name"]').type('POC');

                cy.get('input[placeholder="POC Mobile"]').type(mo)

              })
          }
        });

        cy.wait(600);
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

