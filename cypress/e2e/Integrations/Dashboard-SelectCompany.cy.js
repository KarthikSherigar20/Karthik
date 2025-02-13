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

        const dropdownValues = [];
        cy.contains('option','Select Company').click({force:true});
        
        cy.get('.CustomSelect_select_border__lWd7w')
          .find('option')
          .each(($ec) => {
              dropdownValues.push($ec.text()); // Collect all dropdown values
          })
          .then(() => {
              // Iterate over the collected values
              dropdownValues.forEach((value) => {
                  cy.get('.CustomSelect_select_border__lWd7w').select(value); // Select the current value
                  cy.get('.CustomSelect_select_border__lWd7w').should('have.value', value); // Assert the value
                  cy.wait(500);
              });
          });

          
        



        
    
      });
})