import login1 from '../../support/login1';
import num from '../../fixtures/Number.json';

describe('Meeting link-invalid pat number',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login1();
        }).then(() => {
          cy.log('Login completed');
        });
      })

it('Meeting link-invalid pat number',()=>{
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
cy.get('input[class="doctorConsult_input__iF2im"]').eq(0).type(num.Doc)
cy.wait(2000);
cy.get('input[class="doctorConsult_input__iF2im"]').eq(1).type('94585hgjkh')
cy.wait(2000);
cy.contains('Send Meeting Link').click();
cy.wait(2000);
cy.on('window:alert',(alerttext)=>{
    expect(alerttext).to.equal('Please Provide Valid Patient Numbers');
})
}else{
  cy.wait(2000);
  cy.get('input[class="doctorConsult_input__iF2im"]').eq(0).type(num.Doc)
  cy.wait(2000);
  cy.get('input[class="doctorConsult_input__iF2im"]').eq(1).type('94585hgjkh')
  cy.wait(2000);
  cy.contains('Send Meeting Link').click();
  cy.wait(2000);
  cy.on('window:alert',(alerttext)=>{
      expect(alerttext).to.equal('Please Provide Valid Patient Numbers');
  })
}
})
})
})

