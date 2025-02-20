import login from "../../../support/login";

describe('Checkbox',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

it('Checkbox',()=>{
    cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(1).click();

    cy.wait(500);

    cy.get('input[class="checkbox_inputStyle__Rjg8M"]').each((check)=>{
        cy.wrap(check).scrollIntoView().should('be.enabled').and('be.visible');
    })

})
})