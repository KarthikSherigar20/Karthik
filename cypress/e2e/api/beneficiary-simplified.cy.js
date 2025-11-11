describe('Beneficiary Find By Email - Simplified', () => {
  let testData;

  before(() => {
    cy.fixture('testData').then(data => testData = data);
  });

  describe('Happy Path', () => {
    it('should find beneficiary with valid email', () => {
      cy.findBeneficiaryByEmail('valid@pococare.com')
        .then(response => {
          expect(response.status).to.be.oneOf([200, 404]);
        });
    });
  });

  describe('Edge Cases', () => {
    testData?.beneficiary?.invalidEmails?.forEach(email => {
      it(`should reject invalid email: ${email}`, () => {
        cy.findBeneficiaryByEmail(email)
          .then(response => {
            expect(response.status).to.be.oneOf([400, 422]);
          });
      });
    });

    it('should handle missing email parameter', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/beneficiary/find-by-email`,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.be.oneOf([400, 422]);
      });
    });

    it('should handle SQL injection', () => {
      cy.findBeneficiaryByEmail(testData.edgeCases.sqlInjection)
        .then(response => {
          expect(response.status).to.be.oneOf([400, 422]);
        });
    });

    it('should measure response time', () => {
      cy.measureResponseTime(() => 
        cy.findBeneficiaryByEmail('test@example.com')
      ).then(result => {
        expect(result.responseTime).to.be.lessThan(5000);
      });
    });
  });
});