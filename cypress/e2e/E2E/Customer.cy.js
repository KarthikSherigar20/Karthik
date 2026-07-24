import Elements from "../../Objects/Elements";
const url = require('../../fixtures/urls.json');

describe('Customer E2E', () => {
  let elements;

  beforeEach(() => {
    cy.parseXlsx('cypress/Excels/Insurance information.xlsx').then((jsonData) => {
      const loginEmail = jsonData[0].data[1][0];
      const baseUrl = url.environments[url.selectedEnvironment];

      cy.visit(baseUrl);
      elements = new Elements();
      elements.login();
      cy.wait(500);
      // elements.email(loginEmail);
      // elements.sendotp();
      // cy.get('input[aria-label="Please enter OTP character 1"]').should('be.visible');
      // elements.PTA();
      // elements.OTP();
      // cy.contains('Verify').should('be.visible').click();
    });
  });

  // it('should add beneficiary with valid details', () => {
  //   cy.get('svg.DashBoard_floatingbutton__JYFh9', { timeout: 10000 })
  //     .should('be.visible')
  //     .click();

  //   cy.get('input.chakra-input').eq(0)
  //     .should('be.visible')
  //     .type('Test');

  //   cy.get('select.chakra-select')
  //     .should('be.visible')
  //     .select('Others');

  //   cy.get('input[placeholder="00000-00000"]')
  //     .should('be.visible')
  //     .type('8888885896');

  //   cy.get('input.chakra-input').eq(1)
  //     .should('be.visible')
  //     .type('Bangalore');

  //   cy.get('input.chakra-input').eq(2)
  //     .should('be.visible')
  //     .type('560103');

  //   cy.contains('button', 'Add').should('be.visible').click();
  // });

  it('should veriTestfy QR code manual PDF content', () => {
    cy.contains('View Profile').eq(0).scrollIntoView().click();
    cy.wait(500);
    cy.get('a:contains("QR code manual")').scrollIntoView() // adjust selector to match your element
      .should('have.attr', 'href')
      .then((pdfUrl) => {
        cy.request({ url: pdfUrl, encoding: 'binary' }).then((response) => {
          cy.writeFile('cypress/downloads/qr-manual.pdf', response.body, 'binary');
        });

        cy.task('readPdf', 'cypress/downloads/qr-manual.pdf').then((text) => {
          expect(text).to.include(`Welcome to Pococare's Life-Saving Network!`); // replace with actual text
        });
      });
  });
});
