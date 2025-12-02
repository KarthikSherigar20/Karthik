import login from "../../../support/login";

describe('Manage Company-Every fields', () => {
  before(() => {
    login();
    cy.log('Login completed');
  });

  it('Manage Company1', () => {
    // Click on the Manage Company icon
    cy.get('[class="chakra-icon css-6ey7w3"]').eq(7).scrollIntoView().click();

    // Assert that the Manage Company page is loaded
    cy.get('body').should('contain', 'Manage Company');

    // Define the subscription types to test
    const types = [];

    cy.get('#subscriptionType option').each(($option) => {
      const optionText = $option.text().trim();
      if (optionText !== 'Select Type') {
        types.push(optionText);
      }
    }).then(() => {
      // Print the array once it's fully populated
      cy.log('Subscription Types:', types.join(', '));
    });

    // Loop through each subscription type
    cy.wrap(types).each((type) => {
      // Ensure the company name input exists
      cy.get('#companyName', { timeout: 10000 }).should('exist');

      // Clear and type the company name
      cy.get('#companyName').clear().scrollIntoView().type(`Test Company_${type}`);

      // Select the subscription type
      cy.get('#subscriptionType').select(type);

      cy.get('input[placeholder="Enter Logo URL"]').type('www.google.com/abcd');

      cy.get('input[placeholder="Enter Web Context"]').type(`Test Company_${type}`);

      cy.get('#emailPattern').type(`Test Company_${type}.com`)

      // Click the submit button
      cy.get('button[class="chakra-button css-h211ee"]').click();

      cy.wait(1000);
      cy.reload();
      let today = new Date();
      let systemDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

      cy.contains(`Test Company_${type}`).nextAll().eq(1).should('contain', systemDate);

      cy.wait(1000);

    });
  });
});