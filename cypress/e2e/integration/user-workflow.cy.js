describe('User Workflow Integration', () => {
  let userId, authToken;

  beforeEach(() => {
    cy.task('db:seed');
  });

  afterEach(() => {
    cy.cleanupTestData();
  });

  it('complete user lifecycle', () => {
    // Register user
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/users/register`,
      body: {
        name: 'Integration User',
        email: 'integration@test.com',
        password: 'SecurePass123'
      }
    }).then(response => {
      expect(response.status).to.eq(201);
      userId = response.body.id;
    });

    // Login
    cy.request({
      method: 'POST',
      url: `${Cypress.env('authUrl')}/login`,
      body: {
        username: 'integration@test.com',
        password: 'SecurePass123'
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      authToken = response.body.token;
    });

    // Update profile
    cy.request({
      method: 'PUT',
      url: `${Cypress.env('apiUrl')}/users/${userId}`,
      headers: { 'Authorization': `Bearer ${authToken}` },
      body: { name: 'Updated User' }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('Updated User');
    });

    // Verify update
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/users/${userId}`,
      headers: { 'Authorization': `Bearer ${authToken}` }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('Updated User');
    });

    // Logout
    cy.request({
      method: 'POST',
      url: `${Cypress.env('authUrl')}/logout`,
      headers: { 'Authorization': `Bearer ${authToken}` }
    }).then(response => {
      expect(response.status).to.eq(200);
    });
  });

  it('handles concurrent operations', () => {
    const users = [
      { name: 'User 1', email: 'user1@test.com' },
      { name: 'User 2', email: 'user2@test.com' }
    ];

    const promises = users.map(user => 
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/users`,
        body: { ...user, password: 'TestPass123' }
      })
    );

    cy.wrap(Promise.all(promises)).then(responses => {
      responses.forEach(response => {
        expect(response.status).to.eq(201);
      });
    });
  });
});