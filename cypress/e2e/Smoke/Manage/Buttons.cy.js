import login from "../../../support/login";

describe('Buttons',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

it('Buttons',()=>{
    cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(2).click();

    cy.wait(500);

    const buttons=['button[type="button"]','button[type="submit"]']

    buttons.forEach((button)=>{
        cy.get(button).each((b)=>{
            cy.wrap(b).scrollIntoView().should('be.visible').and('not.be.disabled')
        })
    })


})
})