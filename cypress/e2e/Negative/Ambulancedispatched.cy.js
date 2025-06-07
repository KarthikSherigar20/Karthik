import login1 from '../../support/login1';

describe('Ambulance Dispatched', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login1();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('Ambulance Dispatched', () => {
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
        cy.wait(600);
        cy.get('div[class="backgroundWrapper_backgroundWrapper__o39ed pickupLocation_background__0UPLQ"]')
          .find('div[class="addressCard_card__z5GWw"]').first().click();
        cy.wait(600);
        cy.contains('Select Drop Location', { timeout: 10000 }).scrollIntoView().should('be.visible');
        cy.get('div[class="container nearByHospital_addressCard__ORdPs"]').find('div[class="addressCard_card_flex__6BZvF"]')
          .first().click();
        cy.wait(600);
        cy.contains('Start Emergency').click();
        cy.wait(600);
        cy.wait(2000);
        cy.contains('Ambulance Dispatched').click();
        cy.wait(1500);
        cy.get('body').should('contain', 'Success');
        cy.wait(2000);
        cy.contains('Ambulance Dispatched').click();
        cy.wait(1500);
        cy.get('body').should('contain', 'Already Ambulance dispatched');
      } else {
        cy.contains('Ambulance Dispatched').click();
        cy.wait(1500);
        cy.get('body').should('contain', 'Success');
        cy.wait(2000);
        cy.contains('Ambulance Dispatched').click();
        cy.wait(1500);
        cy.get('body').should('contain', 'Already Ambulance dispatched');

      }
    })
  })
})

