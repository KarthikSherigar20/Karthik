import login1 from '../../support/login1';

describe('pickup location',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login1();
        }).then(() => {
          cy.log('Login completed');
        });
      })

it('pickup location',()=>{
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
cy.contains('Pickup Location').click();
cy.wait(1500);
cy.get('body').should('contain','Success');
cy.wait(2000);
cy.contains('Pickup Location').click();
cy.wait(1500);
cy.get('body').should('contain','Already Ambulance arrived pickup location');
}else{
    cy.contains('Pickup Location').click();
    cy.wait(1500);
    cy.get('body').should('contain','Success');
    cy.wait(2000);
    cy.contains('Pickup Location').click();
    cy.wait(1500);
    cy.get('body').should('contain','Already Ambulance arrived pickup location');

}
})
})
})

