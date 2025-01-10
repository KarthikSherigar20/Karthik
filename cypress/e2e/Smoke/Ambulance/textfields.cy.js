import login from "../../../support/login";

describe('textfields',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

it('Textfileds',()=>{
    cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(9).click();

    cy.wait(500)

    cy.get('input[class="chakra-input css-1cjy4zv"]').then((elements)=>{
        const ele=Cypress.$(elements).slice(0,8);
        cy.wrap(ele).each((el)=>{
            cy.wrap(el).
            should('be.visible').and('not.be.disabled');
            
        }) 
    })
})
})