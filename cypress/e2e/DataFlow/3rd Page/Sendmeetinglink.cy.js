import Num from '../../../fixtures/Number.json';
import login from '../../../support/login';

describe('Sendmeetinglink', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('Sendmeetinglink', () => {
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
        cy.get('input[class="doctorConsult_input__iF2im"]').eq(0).type(Num.Doc);
        cy.wait(2000);
        cy.get('input[class="doctorConsult_input__iF2im"]').eq(1).type(Num.Pat);
        cy.wait(2000);
        cy.contains(' Send Meeting Link').click();
        cy.wait(2000);
        cy.on('window:alert', (alertmsg) => {
          expect(alertmsg).to.equal('MeetingLink Sent Successfully');
        })
        cy.wait(1500);
        cy.contains('Emergency Resolved').click();
      }
    })
  })
})

