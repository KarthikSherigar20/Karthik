import login from "../../support/login";

describe('Dropdown',()=>{
    before(()=>{
        login()
        cy.log('login completed')
    })

it('dropdown',()=>{
    cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(1).click();

    cy.wait(500);

    cy.get('select[style="border: 1px solid black;"]').find('option').then(($options) => {
        const dropdown = [];
    
        // Extract the text of each option
        $options.each((index, option) => {
            dropdown.push(option.innerText);
        });
    
        // Iterate through the dropdown options and select each one
        dropdown.forEach((drop) => {
            cy.get('select[style="border: 1px solid black;"]')
              .select(drop)
              .should('have.value', drop); // Assert selected value
        });
    });
    
})
})