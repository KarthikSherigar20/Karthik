describe('Users API', () => {
  let testData;

  before(() => {
    cy.fixture('testData').then(data => testData = data);
  });

  describe('GET /users', () => {
    it('should return users list', () => {
      cy.request('GET', `${Cypress.env('apiUrl')}/users`)
        .then(response => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an('array');
        });
    });
  });

  describe('POST /users', () => {
    it('should create user successfully', () => {
      cy.createTestUser(testData.users.valid)
        .then(response => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property('id');
        });
    });

    it('should reject invalid data', () => {
      cy.createTestUser(testData.users.invalid)
        .then(response => {
          expect(response.status).to.eq(400);
        });
    });

    it('should handle SQL injection', () => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/users`,
        body: { name: testData.edgeCases.sqlInjection },
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.be.oneOf([400, 422]);
      });
    });

    it('should handle XSS payload', () => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/users`,
        body: { name: testData.edgeCases.xssPayload },
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.be.oneOf([400, 201]);
      });
    });

    it('should handle large payload', () => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/users`,
        body: { name: testData.edgeCases.largeString },
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.be.oneOf([400, 413]);
      });
    });
  });
});