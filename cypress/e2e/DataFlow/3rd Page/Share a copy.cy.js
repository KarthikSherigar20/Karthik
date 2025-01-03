import login from '../../../support/login';

describe('Share a copy',()=>{
    before(() => {
        cy.wrap(null).then(() => {
          login();
        }).then(() => {
          cy.log('Login completed');
        });
      })

it('Share a copy',()=>{
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
cy.contains('Operations').scrollIntoView().click();
cy.wait(2000);
cy.get('body').then(($body)=>{
    const bodyText=$body.text();
    if(bodyText.includes('Share a Copy')){
        cy.contains('Share a Copy').click();
        cy.wait(1500);
        cy.get('body').should('contain','Insurance details send to patient');
    }else{
        cy.log('Insurance not found');
    }
})
}
})
})
})

