import login from "../../../support/login";

describe('ratecard', () => {
  before(() => {
    login()
    cy.log('Login completed')
  })

  it('ratecard', () => {
    cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(9).click();

    cy.wait(500);

    cy.contains('Ambulance RateCard').click();

    cy.wait(500);

    const names = ['Ambulance Provider Rate Card', 'Select Provider', 'Ambulance Type', 'Vehicle Type']

    names.forEach((name) => {
      cy.get('body').should('contain', name)
    })
    const providers = [];
    const AmbulanceType = [];

    // Populate the `providers` array with options' text
    cy.get('select[class="chakra-select css-161pkch"]')
      .eq(0)
      .find('option')
      .each((option) => {
        providers.push(option.text());
      })
      .then(() => {
        // Log the populated providers array
        cy.log('Providers:', providers.join(', '));

        // Populate the `AmbulanceType` array with options' text
        cy.get('select[class="chakra-select css-161pkch"]')
          .eq(1)
          .find('option')
          .each((option) => {
            AmbulanceType.push(option.text());
          })
          .then(() => {
            cy.log('Ambulance Types:', AmbulanceType.join(', '));

            // Iterate over the filtered `providers` array
            providers
              .filter((pro) => pro !== 'Select Provider') // Exclude the default option
              .forEach((pro) => {
                // Select each provider
                cy.log('Selecting provider:', pro);
                cy.get('select[class="chakra-select css-161pkch"]')
                  .eq(0)
                  .select(pro)
                  .should('contain', pro); // Use `.have.value` for better accuracy

                // Iterate over the filtered `AmbulanceType` array for each provider
                AmbulanceType.filter((type) => type !== 'Select Ambulance Type') // Exclude the default option
                  .forEach((type) => {
                    cy.log('Selecting ambulance type:', type);
                    cy.get('select[class="chakra-select css-161pkch"]')
                      .eq(1)
                      .select(type)
                      .should('contain', type); // Use `.have.value` for better accuracy
                  });
              });
          });
      });


    // Check for either "Update" or "Create" button
    cy.contains(/Update|Create/i).should('not.be.disabled').and('be.visible');

    // Assert buttons in the list
    cy.contains('Add Rate Card').should('not.be.disabled').and('be.visible');


  })
})