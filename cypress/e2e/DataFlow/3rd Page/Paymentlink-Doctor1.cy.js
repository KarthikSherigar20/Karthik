import Num from '../../../fixtures/Number.json';
import login2 from '../../../support/Login-Doctorpayment';

describe('Paymentlink-Doctor1',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login2();
        }).then(() => {
          cy.log('Login completed');
        });
      })

it('Paymentlink-Doctor1',()=>{
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
    cy.get('div[class="ant-flex css-zg0ahe ant-flex-align-stretch ant-flex-vertical"]').should('not.be.disabled').should('be.visible');
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(2).should('not.be.disabled')
    .type(Num.Pat);
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(2).should('have.value',Num.Pat);
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(2).clear().should('not.have.value');
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(3).should('not.be.disabled')
    .type(Num.Pate);
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(3).should('have.value',Num.Pate);
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(3).clear().should('not.have.value');
    cy.wait(1500);
    cy.contains('Send Payment Link').should('be.visible').should('not.be.disabled');
    cy.wait(1500);
    cy.get('svg[data-icon="close"]').click();
    }
else{
  
  
    cy.contains('Work in progress').click();
    cy.wait(1500);
    cy.contains('Send PaymentLink For Doctor-Consult').should('be.visible')
    .click();
    cy.wait(1500);
    cy.get('body').should('contain','Doctor-Consultation');
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(0).should('have.value','Emergency');
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(1).should('have.value','500');
    cy.wait(1500);
    cy.get('div[class="ant-flex css-zg0ahe ant-flex-align-stretch ant-flex-vertical"]').should('not.be.disabled').should('be.visible');
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(2).should('not.be.disabled')
    .type(Num.Pat);
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(2).should('have.value',Num.Pat);
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(2).clear().should('not.have.value');
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(3).should('not.be.disabled')
    .type(Num.Pate);
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(3).should('have.value',Num.Pate);
    cy.wait(1500);
    cy.get('input[class="ant-input css-zg0ahe"]').eq(3).clear().should('not.have.value');
    cy.wait(1500);
    cy.contains('Send Payment Link').should('be.visible').should('not.be.disabled');
    cy.wait(1500);
    cy.get('svg[data-icon="close"]').click();

}

})
})
})

