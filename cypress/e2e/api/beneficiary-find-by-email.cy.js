const apiUrl=Cypress.env('apiUrl');

describe('Beneficiary Find By Email API', () => {
  const endpoint = '/find-by-email';
  let testData;

  before(() => {
    cy.fixture('testData').then(data => testData = data);
  });

  // Helper function to make requests with headers
  const makeRequest = (options) => {
    return cy.request({
      headers: testData.auth.headers,
      failOnStatusCode: false,
      ...options
    });
  };

  describe('Valid Email Tests', () => {
    it('should find beneficiary with valid email', () => {
      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: { "email": "karthik.s@pococare.com" }
      }).then(response => {
        console.log('Response Status:', response.status);
        console.log('Response Body:', JSON.stringify(response.body, null, 2));
        expect(response.status).to.be.oneOf([200, 404]);
        if (response.status === 200) {
          expect(response.body).to.have.property('email');
        }
      });
    });

    it('should handle case insensitive email', () => {
      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: { email: 'KARTHIK.S@POCOCARE.COM' }
      }).then(response => {
        expect(response.status).to.be.oneOf([200, 404]);
      });
    });
  });

  describe('Invalid Email Format Tests', () => {
    const invalidEmails = [
      'invalid-email',
      '@domain.com',
      'user@',
      'user..name@domain.com',
      'user@domain',
      'user name@domain.com',
      'user@domain..com'
    ];

    invalidEmails.forEach(email => {
      it(`should reject invalid email: ${email}`, () => {
        makeRequest({
          method: 'GET',
          url: `${Cypress.env('apiUrl')}${endpoint}`,
          body: { email }
        }).then(response => {
          expect(response.status).to.be.oneOf([400,401, 422]);
        });
      });
    });
  });

  describe('Missing/Empty Parameter Tests', () => {
    it('should handle missing email parameter', () => {
      makeRequest({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: {}
      }).then(response => {
        expect(response.status).to.be.oneOf([400, 422]);
        expect(response.body).to.have.property('message');
      });
    });

    it('should handle empty email parameter', () => {
      makeRequest({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: { email: '' }
      }).then(response => {
        expect(response.status).to.be.oneOf([400, 422]);
      });
    });

    it('should handle null email parameter', () => {
      makeRequest({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: { email: null }
      }).then(response => {
        expect(response.status).to.be.oneOf([400, 422]);
      });
    });
  });

  describe('Security Tests', () => {
    it('should handle SQL injection in email', () => {
      makeRequest({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: { email: testData.edgeCases.sqlInjection }
      }).then(response => {
        expect(response.status).to.be.oneOf([400, 422]);
      });
    });

    it('should handle XSS payload in email', () => {
      makeRequest({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: { email: testData.edgeCases.xssPayload }
      }).then(response => {
        expect(response.status).to.be.oneOf([400, 422]);
      });
    });

    it('should handle special characters', () => {
      makeRequest({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: { email: testData.edgeCases.specialChars }
      }).then(response => {
        expect(response.status).to.be.oneOf([400, 422]);
      });
    });
  });

  describe('Boundary Tests', () => {
    it('should handle very long email', () => {
      const longEmail = 'a'.repeat(250) + '@domain.com';
      makeRequest({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: { email: longEmail }
      }).then(response => {
        expect(response.status).to.be.oneOf([400, 422]);
      });
    });

    it('should handle minimum valid email', () => {
      makeRequest({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: { email: 'a@b.co' }
      }).then(response => {
        expect(response.status).to.be.oneOf([200, 401, 404, 400]);
      });
    });
  });

  describe('HTTP Method Tests', () => {
    it('should reject POST method', () => {
      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: { email: 'test@example.com' }
      }).then(response => {
        expect(response.status).to.eq(404,405);
      });
    });

    it('should reject PUT method', () => {
      makeRequest({
        method: 'PUT',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: { email: 'test@example.com' }
      }).then(response => {
        expect(response.status).to.eq(404 ,405);
      });
    });

    it('should reject DELETE method', () => {
      makeRequest({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}${endpoint}`
      }).then(response => {
        expect(response.status).to.eq(404,405);
      });
    });
  });

  describe('Response Validation Tests', () => {
    it('should return proper content-type header', () => {
      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: { email: 'test@example.com' }
      }).then(response => {
        expect(response.headers).to.have.property('content-type');
        expect(response.headers['content-type']).to.include('application/json');
      });
    });

    it('should validate response structure on success', () => {
      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: { email: 'valid@pococare.com' }
      }).then(response => {
        if (response.status === 200) {
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('email');
          expect(response.body.email).to.be.a('string');
        }
      });
    });
  });

  describe('Performance Tests', () => {
    it('should respond within acceptable time', () => {
      const startTime = Date.now();
      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: { email: 'test@example.com' }
      }).then(response => {
        const responseTime = Date.now() - startTime;
        expect(responseTime).to.be.lessThan(5000);
      });
    });
  });

  describe('Concurrent Request Tests', () => {
    it('should handle multiple concurrent requests', () => {
      const requests = Array.from({ length: 5 }, (_, i) => 
        makeRequest({
          method: 'POST',
          url: `${Cypress.env('apiUrl')}${endpoint}`,
          body: { email: `test${i}@example.com` }
        })
      );

      Promise.all(requests).then(responses => {
        responses.forEach(response => {
          expect(response.status).to.be.oneOf([200, 404, 400]);
        });
      });
    });
  });

  describe('Unicode and Encoding Tests', () => {
    it('should handle unicode characters in email', () => {
      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: { email: 'tëst@éxample.com' }
      }).then(response => {
        expect(response.status).to.be.oneOf([200, 404, 400]);
      });
    });

    it('should handle URL encoded email', () => {
      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: { email: 'test%40example.com' }
      }).then(response => {
        expect(response.status).to.be.oneOf([200, 404, 400]);
      });
    });
  });
});