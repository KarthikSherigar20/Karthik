import login from "../../support/login";

describe('Sendemail',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

it('Sendemail',()=>{
    cy.get('[class="chakra-icon css-6ey7w3"]').eq(5).scrollIntoView().click();

    cy.get('body').should('contain','Send Email')

})
})