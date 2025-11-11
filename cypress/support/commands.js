// Authentication
Cypress.Commands.add('apiLogin', (username = 'testuser', password = 'testpass') => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('authUrl')}/login`,
    body: { username, password }
  }).then(response => {
    window.localStorage.setItem('authToken', response.body.token);
    return response.body.token;
  });
});

// Authenticated requests
Cypress.Commands.add('authenticatedRequest', (method, url, body = {}) => {
  const token = window.localStorage.getItem('authToken');
  return cy.request({
    method,
    url: `${Cypress.env('apiUrl')}${url}`,
    headers: { 'Authorization': `Bearer ${token}` },
    body,
    failOnStatusCode: false
  });
});

// Create test user
Cypress.Commands.add('createTestUser', (userData = {}) => {
  const defaultUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'testpass123'
  };
  
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/users`,
    body: { ...defaultUser, ...userData },
    failOnStatusCode: false
  });
});

// API logging command
Cypress.Commands.add('loggedRequest', (requestOptions) => {
  const startTime = Date.now();
  return cy.request(requestOptions).then(response => {
    const endTime = Date.now();
    const logData = {
      method: requestOptions.method,
      url: requestOptions.url,
      headers: requestOptions.headers || {},
      requestBody: requestOptions.body || {},
      responseStatus: response.status,
      responseHeaders: response.headers,
      responseBody: response.body,
      responseTime: endTime - startTime,
      testName: Cypress.currentTest.title
    };
    cy.task('logApiCall', logData);
    return response;
  });
});

// Beneficiary API commands
Cypress.Commands.add('findBeneficiaryByEmail', (email, options = {}) => {
  return cy.loggedRequest({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/beneficiary/find-by-email`,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    body: { email },
    failOnStatusCode: false,
    ...options
  });
});

Cypress.Commands.add('validateEmailFormat', (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
});

Cypress.Commands.add('measureResponseTime', (requestFn) => {
  const startTime = Date.now();
  return requestFn().then(response => {
    const responseTime = Date.now() - startTime;
    return { ...response, responseTime };
  });
});

// Cleanup
Cypress.Commands.add('cleanupTestData', () => {
  cy.task('db:clean');
});