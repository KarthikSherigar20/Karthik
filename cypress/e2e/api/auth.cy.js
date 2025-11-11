describe('Authentication API', () => {
  let testData;

  before(() => {
    cy.fixture('testData').then(data => testData = data);
  });

  describe('POST /auth/login', () => {
    it('should login with valid credentials', () => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('authUrl')}/login`,
        body: testData.auth.valid
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
      });
    });

    it('should reject invalid credentials', () => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('authUrl')}/login`,
        body: testData.auth.invalid,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(401);
      });
    });

    it('should handle missing credentials', () => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('authUrl')}/login`,
        body: {},
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(400);
      });
    });
  });

  describe('Protected Routes', () => {
    it('should access with valid token', () => {
      cy.apiLogin().then(() => {
        cy.authenticatedRequest('GET', '/protected')
          .then(response => {
            expect(response.status).to.eq(200);
          });
      });
    });

    it('should reject expired token', () => {
      window.localStorage.setItem('authToken', 'expired.token');
      cy.authenticatedRequest('GET', '/protected')
        .then(response => {
          expect(response.status).to.eq(401);
        });
    });

    it('should reject missing token', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/protected`,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(401);
      });
    });
  });
});