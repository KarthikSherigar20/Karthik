import login from "../../../support/login";

describe('ambulancecity',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

it('Ambulancecity',()=>{
    cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(9).click();

    cy.wait(500)

    cy.contains('Ambulance City').click();

    const names=['Ambulance Cities','Select Provider','City','State','Remove','Add']

    names.forEach((name)=>{
        cy.get('body').should('contain',name)
    })

    cy.get('select[class="chakra-select css-161pkch"]').should('not.be.disabled').should('exist')

    cy.contains('Remove All Cities').should('exist').and('be.disabled')

    cy.contains('Add City').should('exist').and('not.be.disabled')

    cy.contains('Add').should('exist').and('not.be.disabled')

  const loc=['input[placeholder="e.g Bangalore"]','div[class=" css-hlgwow"]','button[class="chakra-button css-dna3k"]']

  loc.forEach((lo)=>{
  cy.get(lo).should('exist').and('not.be.disabled')
  })
   


    


})
})