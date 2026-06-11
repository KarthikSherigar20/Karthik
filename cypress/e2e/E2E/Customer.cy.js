import Elements from "../../Objects/Elements";
const url = require('../../fixtures/urls.json');

describe('Customer E2E', () => {
  let elements;

  before(() => {
    cy.parseXlsx('cypress/Excels/Insurance information.xlsx').then((jsonData) => {
      const loginEmail = jsonData[0].data[1][0];
      const baseUrl = url.environments[url.selectedEnvironment];

      cy.visit(baseUrl);
      elements = new Elements();
      elements.email(loginEmail);
      elements.sendotp();
      cy.get('input[aria-label="Please enter OTP character 1"]').should('be.visible');
      elements.PTA();
      elements.OTP();
      cy.contains('Verify').should('be.visible').click();
    });
  });

  it('should add beneficiary with valid details', () => {
    cy.get('svg.DashBoard_floatingbutton__JYFh9', { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.get('input.chakra-input').eq(0)
      .should('be.visible')
      .type('Test');

    cy.get('select.chakra-select')
      .should('be.visible')
      .select('Others');

    cy.get('input[placeholder="00000-00000"]')
      .should('be.visible')
      .type('8888885896');

    cy.get('input.chakra-input').eq(1)
      .should('be.visible')
      .type('Bangalore');

    cy.get('input.chakra-input').eq(2)
      .should('be.visible')
      .type('560103');

    cy.contains('button', 'Add').should('be.visible').click();
  });
});
