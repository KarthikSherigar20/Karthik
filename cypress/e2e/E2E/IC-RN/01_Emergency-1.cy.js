import Num from '../../../fixtures/Number.json';
import login4 from '../../../support/login4-icrn';

describe('IC-RN-EM',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login4();
        }).then(() => {
          cy.log('login completed');
        });
      })

it('Emergency-1',()=>{
cy.get('body').then(($bodyText)=>{
    const bodyText=$bodyText.text();
    if(bodyText.includes('New')){

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
cy.get('input[class="doctorConsult_input__iF2im"]').eq(0).type(Num.Doc);
cy.wait(2000);
cy.contains(' Send Meeting Link').click();
cy.wait(2000);
cy.on('window:alert',(alertmsg)=>{
    expect(alertmsg).to.equal('MeetingLink Sent Successfully');
})
cy.contains('Send Ambulance Message').scrollIntoView().click();
cy.wait(3000);
cy.get('body').then(($bodyText)=>{
    const bodyText=$bodyText.text();
    expect(bodyText.includes('Ambulance Request Successfully Sent')).to.be.true;
})
cy.wait(2000);
cy.contains('Ambulance Dispatched').scrollIntoView().click();
cy.wait(2000);
cy.get('body').then(($bodyText)=>{
    const bodyText=$bodyText.text();
    expect(bodyText.includes('Success')).to.be.true;
})
cy.wait(2000);
cy.contains('Pickup Location').scrollIntoView().click();
cy.wait(2000);
cy.get('body').then(($bodyText)=>{
    const bodyText=$bodyText.text();
    expect(bodyText.includes('Success')).to.be.true;
})
cy.wait(2000);
cy.contains('Pickup Patient').scrollIntoView().click();
cy.wait(2000);
cy.get('body').then(($bodyText)=>{
    const bodyText=$bodyText.text();
    expect(bodyText.includes('Success')).to.be.true;
})
cy.wait(2000);
cy.contains('Patient Dropped').scrollIntoView().click();
cy.wait(2000);
cy.get('body').then(($bodyText)=>{
    const bodyText=$bodyText.text();
    expect(bodyText.includes('Success')).to.be.true;
})
cy.wait(2000);
cy.contains('Emergency Resolved').click();
cy.wait(2000);
cy.get('body').then(($bodyText)=>{
    const bodyText=$bodyText.text();
    expect(bodyText.includes('Emergency Resolved Successfully')).to.be.true;
})
}
})
})
})

