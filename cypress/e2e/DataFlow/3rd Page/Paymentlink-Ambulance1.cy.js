import Num from '../../../fixtures/Number.json';
import login2 from '../../../support/Login-Ambulancepayment';

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
    cy.wait(1500);
    cy.get('input[class="radioButton_radio__Dmg-B"]').eq(3).scrollIntoView().click();
    cy.wait(1500);
    cy.get('input[class="radioButton_radio__Dmg-B"]').eq(8).scrollIntoView().click();
    cy.wait(1500);
    cy.contains('Save Assessment').scrollIntoView().click();
    cy.wait(1500);
    cy.get('input[name="addressSelection"]').eq(0).click();
    cy.wait(1500);
    cy.get('input[type="radio"]').eq(0).click();
    cy.wait(1500);
    cy.contains('Start Emergency').click();
    cy.wait(1500);
    cy.contains('Send PaymentLink For Ambulance').should('be.visible')
    .click();
    cy.wait(1500);
    cy.contains('Send Payment Link').should('be.visible');
    cy.wait(1500);
    cy.contains('Please Select Ambulance Provider').click({force:true});
    cy.wait(1500);
    cy.contains('Dial4242').should('be.visible').click();
    cy.wait(1500);
    cy.contains('Please Select Ambulance Type').click({force:true});
    cy.wait(1500);
    const wordsToCheck =[
        'BLS-EECO/Bolero',
        'BLS-Tempo/Tata Winger',
        'ALS (with paramedic)-Tempo/Tata Winger',
        'ALS (with doctor/EMT)-Tempo/Tata Winger'
    ];
    wordsToCheck.forEach(word=>{
        cy.contains(word);
    })



    }
else{
    cy.contains('Work in progress').click();
    cy.wait(1500);
    cy.contains('Send PaymentLink For Ambulance').should('be.visible')
    .click();
    cy.wait(1500);
    cy.contains('Send Payment Link').should('be.visible');
    cy.wait(1500);
    cy.contains('Please Select Ambulance Provider').click({force:true});
    cy.wait(1500);
    cy.contains('Dial4242').should('be.visible').click();
    cy.wait(1500);
    cy.contains('Please Select Ambulance Type').click({force:true});
    cy.wait(1500);
    const wordsToCheck =[
        'BLS-EECO/Bolero',
        'BLS-Tempo/Tata Winger',
        'ALS (with paramedic)-Tempo/Tata Winger',
        'ALS (with doctor/EMT)-Tempo/Tata Winger'
    ];
    wordsToCheck.forEach(word=>{
        cy.contains(word);
    })
    cy.wait(1500);
    cy.contains('Please Select Ambulance Type').click({force:true});
    cy.wait(1500);
    wordsToCheck.forEach(word=>{
    cy.contains('Please Select Ambulance Type').click({force:true});
    cy.wait(1500);
    cy.contains(word).click({force:true});
    cy.wait(1500);
    cy.get('input[placeholder="₹ Ambulance Fare"]').should('have.value');
    cy.wait(1500);
    })
}

})
})
})

