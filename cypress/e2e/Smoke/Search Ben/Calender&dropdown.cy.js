import login from "../../../support/login";

describe('C&D',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

it('C&D',()=>{
    cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(1).click();

    cy.wait(500);
    
    cy.get('input[type="date"]').each((da)=>{
        cy.wrap(da).scrollIntoView().should('be.enabled').and('be.visible')
    })
    
    cy.wait(500);
    cy.get('select[style="border: 1px solid black;"]')
    .scrollIntoView().should('be.enabled')
    .and('be.visible');
})


})