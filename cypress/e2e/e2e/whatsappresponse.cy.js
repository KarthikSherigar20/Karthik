import login from "../../support/login";

describe('whatsappresponse',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

it('whatsappresponse',()=>{
    cy.get('[class="chakra-icon css-6ey7w3"]').eq(6).scrollIntoView().click();

    cy.contains('send').click()

    cy.get('body').should('contain','whatsappMsgId')

})
})