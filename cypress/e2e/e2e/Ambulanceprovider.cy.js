import login from "../../support/login";

describe('Ambulanceprovider',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

it('Ambulanceprovider',()=>{
    cy.get('[class="chakra-icon css-6ey7w3"]').eq(9).scrollIntoView().click();

    cy.get('body').should('contain','Ambulance Provider').scrollIntoView();

    cy.get('input[placeholder="Enter service name"]').type('Test_Provider')

    cy.get('input[placeholder="Enter address line 1"]').type('Abcd 1244 gjfhe')

    cy.get('input[placeholder="Enter city"]').type('Bangalore')

    cy.get('input[placeholder="Enter state"]').type('Karnataka')

    cy.get('input[placeholder="Enter country"]').type('India')

    cy.get('#pinCode').type('560103');

    cy.get('input[placeholder="Enter contact number"]').scrollIntoView().type('9898989865');

    cy.get('input[placeholder="Enter contact email"]').type('abd@gmail.com')
    
    cy.contains('Next').click();

    cy.wait(1500);

    cy.get('body').should('contain','Test_Provider');
})
})