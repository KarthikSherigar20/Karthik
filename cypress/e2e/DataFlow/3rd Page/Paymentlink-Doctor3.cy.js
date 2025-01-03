import Num from '../../../fixtures/Number.json';
import login2 from '../../../support/Login-Doctorpayment';

describe('Paymentlink-Doctor2',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login2();
        }).then(() => {
          cy.log('Login completed');
        });
      })

it('Paymentlink-Doctor2',()=>{
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
    cy.contains('Send PaymentLink For Doctor-Consult').should('be.visible')
    .click();
    cy.wait(1500);
    cy.get('body').should('contain','Doctor-Consultation');
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(0).should('have.value','Emergency');
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(1).should('have.value','500');
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(2).should('not.be.disabled')
    .type(Num.Pat);
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(2).should('have.value',Num.Pat);
    cy.wait(1500);
    cy.contains('Send Payment Link').click();
    cy.wait(1500);
    cy.get('svg[data-icon="close"]').should('not.be.visible');
    cy.wait(1500);
    cy.contains('Resend PaymentLink').should('be.visible').should('not.be.disabled');
    cy.wait(1500);
    cy.contains('Send New PaymentLink').should('be.visible').should('not.be.disabled');
    cy.wait(1500);
    cy.contains('Comment').scrollIntoView().click();
    cy.wait(1500);
    cy.get('body').invoke('text').then((text)=>{
        expect(text).to.include('PaymentLink Send for doctor-consultation');
    })

    }
else{
    
    cy.contains('Work in progress').click();
    cy.wait(1500);
    cy.contains('Send PaymentLink For Doctor-Consult').should('be.visible')
    .click();
    cy.get('body').should('contain','Doctor-Consultation');
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(0).should('have.value','Emergency');
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(1).should('have.value','500');
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(2).should('not.be.disabled')
    .type(Num.Pat);
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(2).should('have.value',Num.Pat);
    cy.wait(1500);
    cy.contains('Send Payment Link').click();
    cy.wait(1500);
    cy.get('svg[data-icon="close"]').should('not.be.visible');
    cy.wait(1500);
    cy.contains('Resend PaymentLink').should('be.visible').should('not.be.disabled');
    cy.wait(1500);
    cy.contains('Send New PaymentLink').should('be.visible').should('not.be.disabled');
    cy.wait(1500);
    cy.contains('Comment').scrollIntoView().click();
    cy.wait(1500);
    cy.get('body').invoke('text').then((text)=>{
        expect(text).to.include('PaymentLink Send for doctor-consultation');
    })
}
})
})
})

