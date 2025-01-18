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
            cy.log('Selecting value: ',drop)
            cy.get('select[style="border: 1px solid black;"]')
              .select(drop)
              .should('have.value', drop); // Assert selected value
        });
    });

    const dropdownValues = [];
    cy.get('.CustomSelect_select_border__lWd7w').select('Select Company');
    cy.wait(500);
    
    cy.get('.CustomSelect_select_border__lWd7w')
      .find('option')
      .each(($ec) => {
          dropdownValues.push($ec.text()); // Collect all dropdown values
      })
      .then(() => {
          
          // Iterate over the collected values
          dropdownValues.forEach((value) => {
              cy.log('Selecting value: ',value)
              cy.get('.CustomSelect_select_border__lWd7w').select(value)
              .should('have.value',value)// Select the current value
          });
      });
    

  })
})