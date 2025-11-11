describe('Beneficiary E2E Workflow', () => {
  let testData;
  let createdBeneficiary;

  before(() => {
    cy.fixture('testData').then(data => testData = data);
  });

  // Helper function for authenticated requests
  const makeRequest = (options) => {
    return cy.request({
      headers: testData.auth.headers,
      failOnStatusCode: false,
      ...options
    });
  };

  describe('Complete Beneficiary Lifecycle', () => {
    it('Step 1: Create a new beneficiary', () => {
      const newBeneficiary = {
        email: `test.e2e.${Date.now()}@pococare.com`,
        firstName: 'John',
        lastName: 'Doe',
        phone: '9876543210',
        dateOfBirth: '1990-01-01'
      };

      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/beneficiary`,
        body: newBeneficiary
      }).then(response => {
        expect(response.status).to.be.oneOf([200, 201]);
        expect(response.body).to.have.property('email', newBeneficiary.email);
        createdBeneficiary = response.body;
        cy.log('Created beneficiary:', createdBeneficiary.email);
      });
    });

    it('Step 2: Find beneficiary by email', () => {
      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/beneficiary/find-by-email`,
        body: { email: createdBeneficiary.email }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('email', createdBeneficiary.email);
        expect(response.body).to.have.property('firstName', 'John');
        expect(response.body).to.have.property('lastName', 'Doe');
      });
    });

    it('Step 3: Update beneficiary information', () => {
      const updatedData = {
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '9876543211'
      };

      makeRequest({
        method: 'PUT',
        url: `${Cypress.env('apiUrl')}/beneficiary/${createdBeneficiary.id}`,
        body: updatedData
      }).then(response => {
        expect(response.status).to.be.oneOf([200, 204]);
      });
    });

    it('Step 4: Verify updated information', () => {
      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/beneficiary/find-by-email`,
        body: { email: createdBeneficiary.email }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('firstName', 'Jane');
        expect(response.body).to.have.property('lastName', 'Smith');
        expect(response.body).to.have.property('phone', '9876543211');
      });
    });

    it('Step 5: Get all beneficiaries', () => {
      makeRequest({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/beneficiary`
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        const foundBeneficiary = response.body.find(b => b.email === createdBeneficiary.email);
        expect(foundBeneficiary).to.exist;
      });
    });

    it('Step 6: Delete beneficiary', () => {
      makeRequest({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}/beneficiary/${createdBeneficiary.id}`
      }).then(response => {
        expect(response.status).to.be.oneOf([200, 204]);
      });
    });

    it('Step 7: Verify beneficiary is deleted', () => {
      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/beneficiary/find-by-email`,
        body: { email: createdBeneficiary.email }
      }).then(response => {
        expect(response.status).to.eq(404);
      });
    });
  });

  describe('Error Handling E2E', () => {
    it('Should handle duplicate email creation', () => {
      const duplicateEmail = 'duplicate@pococare.com';
      
      // Create first beneficiary
      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/beneficiary`,
        body: {
          email: duplicateEmail,
          firstName: 'First',
          lastName: 'User'
        }
      }).then(response => {
        expect(response.status).to.be.oneOf([200, 201]);
      });

      // Try to create duplicate
      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/beneficiary`,
        body: {
          email: duplicateEmail,
          firstName: 'Second',
          lastName: 'User'
        }
      }).then(response => {
        expect(response.status).to.be.oneOf([400, 409]);
        expect(response.body).to.have.property('message');
      });
    });

    it('Should handle invalid email format in workflow', () => {
      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/beneficiary`,
        body: {
          email: 'invalid-email-format',
          firstName: 'Test',
          lastName: 'User'
        }
      }).then(response => {
        expect(response.status).to.be.oneOf([400, 422]);
      });
    });
  });

  describe('Business Logic E2E', () => {
    it('Should validate required fields', () => {
      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/beneficiary`,
        body: {
          email: 'test@example.com'
          // Missing required fields
        }
      }).then(response => {
        expect(response.status).to.be.oneOf([400, 422]);
        expect(response.body).to.have.property('message');
      });
    });

    it('Should handle pagination in list', () => {
      makeRequest({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/beneficiary?page=1&limit=10`
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.at.most(10);
      });
    });
  });

  describe('Performance E2E', () => {
    it('Should handle bulk operations efficiently', () => {
      const startTime = Date.now();
      const bulkEmails = Array.from({ length: 5 }, (_, i) => `bulk${i}@example.com`);
      
      const requests = bulkEmails.map(email => 
        makeRequest({
          method: 'POST',
          url: `${Cypress.env('apiUrl')}/beneficiary/find-by-email`,
          body: { email }
        })
      );

      Promise.all(requests).then(responses => {
        const endTime = Date.now();
        const totalTime = endTime - startTime;
        
        expect(totalTime).to.be.lessThan(10000); // 10 seconds max
        responses.forEach(response => {
          expect(response.status).to.be.oneOf([200, 404]);
        });
      });
    });
  });
});