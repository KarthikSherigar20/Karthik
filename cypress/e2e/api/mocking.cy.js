describe('API Mocking', () => {
  it('should mock successful response', () => {
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [{ id: 1, name: 'Mocked User' }]
    }).as('getUsers');

    cy.request('GET', `${Cypress.env('apiUrl')}/users`)
      .then(response => {
        expect(response.status).to.eq(200);
        expect(response.body[0].name).to.eq('Mocked User');
      });
  });

  it('should mock error response', () => {
    cy.intercept('POST', '/api/users', {
      statusCode: 500,
      body: { error: 'Server Error' }
    });

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/users`,
      body: { name: 'Test' },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(500);
    });
  });

  it('should mock network delay', () => {
    cy.intercept('GET', '/api/slow', (req) => {
      req.reply((res) => {
        res.delay(2000);
        res.send({ data: 'Delayed response' });
      });
    });

    const start = Date.now();
    cy.request('GET', `${Cypress.env('apiUrl')}/slow`)
      .then(() => {
        const duration = Date.now() - start;
        expect(duration).to.be.greaterThan(1900);
      });
  });

  it('should mock dynamic responses', () => {
    cy.intercept('GET', '/api/users/*', (req) => {
      const userId = req.url.split('/').pop();
      if (userId === '999') {
        req.reply({ statusCode: 404 });
      } else {
        req.reply({ statusCode: 200, body: { id: userId } });
      }
    });

    cy.request('GET', `${Cypress.env('apiUrl')}/users/1`)
      .then(response => expect(response.status).to.eq(200));

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/users/999`,
      failOnStatusCode: false
    }).then(response => expect(response.status).to.eq(404));
  });

  it('should simulate network error', () => {
    cy.intercept('GET', '/api/error', { forceNetworkError: true });

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/error`,
      failOnStatusCode: false
    }).should('be.rejected');
  });
});