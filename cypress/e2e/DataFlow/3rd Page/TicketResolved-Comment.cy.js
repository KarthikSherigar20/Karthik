import Num from '../../../fixtures/Number.json';
import login from '../../../support/login';

describe('TicketResolved-Comment',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login();
        }).then(() => {
          cy.log('Login completed');
        });
      })

it('TicketResolved-Comment',()=>{
cy.get('body').then(($bodyText)=>{
    const bodyText=$bodyText.text();
    if(bodyText.includes('New')){

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
      // Get the current date and format it
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0] + ' ' + currentDate.toTimeString().split(':')[0]; // 'YYYY-MM-DD HH'
      cy.wait(1500);
cy.contains('Comment').click();
cy.wait(1500);
cy.get('p[class="text agentNotes_agentNotes__XKhpk"]').eq(2).invoke('text').then((text)=>{
  const partialText = `Meeting link shared to patient,${formattedDate}`;
  expect(text).to.include(partialText);
})
cy.get('.ant-modal-close-x').click();
cy.wait(1500);
cy.contains('Emergency Resolved').click();
cy.wait(1500);
cy.contains('Completed').click();
cy.wait(1500);
cy.contains('Comment').click();
cy.wait(1500);
cy.get('p[class="text agentNotes_agentNotes__XKhpk"]').eq(3).invoke('text').then((text)=>{
  const partialText = `Ticket Resolved,${formattedDate}`;
  expect(text).to.include(partialText);
})
}
})
})
})

