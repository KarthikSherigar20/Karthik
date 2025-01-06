import login from "../../support/login";

describe('Dashboard-SelectCompany',()=>{
    before(()=>{
        cy.wrap(null).then(()=>{
            login();
        }).then(()=>{
            cy.log('Login completed');
        })
    })
    it('should click on SVG icon, wait, and log dropdown details', () => {
        // cy.visit('/your-page-url'); // Replace with your page URL
    
        // Step 1: Click on the SVG icon
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(0).click();
    
        // Step 2: Wait for 1 second (not recommended but included as per request)
        cy.wait(1000);
    
        // Step 3: Select the dropdown and find all options
        cy.get('.CustomSelect_select_border__lWd7w')
          .find('option') // Find all <option> elements
          .should('have.length.greaterThan', 1)
          .then((options) => {
            // Step 4: Log the count of options
            const count = options.length;
            cy.log(`Count of dropdown options: ${count}`);
    
            // Step 5: Log each option's text
            [...options].forEach((option) => {
              cy.log(`Option: ${option.innerText}`);
            });
          });
      });
})