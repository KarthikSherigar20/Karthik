describe('9 API Linked Workflow Automation', () => {
  let testData;
  let workflowData = {}; // Store data passed between APIs

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

  describe('Complete 9 API Workflow', () => {
    
    it('API 1: [PROVIDE API NAME AND ENDPOINT]', () => {
      makeRequest({
        method: 'POST', // UPDATE METHOD
        url: `${Cypress.env('apiUrl')}/api1-endpoint`, // UPDATE ENDPOINT
        body: {
          // ADD REQUEST BODY
        }
      }).then(response => {
        expect(response.status).to.be.oneOf([200, 201]);
        
        // Store response data for next API
        workflowData.api1Response = response.body;
        workflowData.api1Id = response.body.id; // Example: store ID
        
        cy.log('API 1 Response:', JSON.stringify(response.body));
      });
    });

    it('API 2: [PROVIDE API NAME AND ENDPOINT]', () => {
      makeRequest({
        method: 'GET', // UPDATE METHOD
        url: `${Cypress.env('apiUrl')}/api2-endpoint/${workflowData.api1Id}`, // USE DATA FROM API 1
        body: {
          // ADD REQUEST BODY USING DATA FROM API 1
          referenceId: workflowData.api1Id
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        
        // Store response data for next API
        workflowData.api2Response = response.body;
        workflowData.api2Token = response.body.token; // Example: store token
        
        cy.log('API 2 Response:', JSON.stringify(response.body));
      });
    });

    it('API 3: [PROVIDE API NAME AND ENDPOINT]', () => {
      makeRequest({
        method: 'PUT', // UPDATE METHOD
        url: `${Cypress.env('apiUrl')}/api3-endpoint`,
        headers: {
          ...testData.auth.headers,
          'Authorization': `Bearer ${workflowData.api2Token}` // USE TOKEN FROM API 2
        },
        body: {
          // ADD REQUEST BODY USING DATA FROM PREVIOUS APIs
          id: workflowData.api1Id,
          data: workflowData.api2Response.someField
        }
      }).then(response => {
        expect(response.status).to.be.oneOf([200, 204]);
        
        // Store response data for next API
        workflowData.api3Response = response.body;
        
        cy.log('API 3 Response:', JSON.stringify(response.body));
      });
    });

    it('API 4: [PROVIDE API NAME AND ENDPOINT]', () => {
      makeRequest({
        method: 'POST', // UPDATE METHOD
        url: `${Cypress.env('apiUrl')}/api4-endpoint`,
        body: {
          // ADD REQUEST BODY USING DATA FROM PREVIOUS APIs
          parentId: workflowData.api1Id,
          status: workflowData.api3Response.status
        }
      }).then(response => {
        expect(response.status).to.be.oneOf([200, 201]);
        
        // Store response data for next API
        workflowData.api4Response = response.body;
        workflowData.api4List = response.body.items; // Example: store list
        
        cy.log('API 4 Response:', JSON.stringify(response.body));
      });
    });

    it('API 5: [PROVIDE API NAME AND ENDPOINT]', () => {
      makeRequest({
        method: 'GET', // UPDATE METHOD
        url: `${Cypress.env('apiUrl')}/api5-endpoint`,
        qs: {
          // ADD QUERY PARAMETERS USING DATA FROM PREVIOUS APIs
          filter: workflowData.api4List[0].id,
          limit: 10
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        
        // Store response data for next API
        workflowData.api5Response = response.body;
        workflowData.api5SelectedItem = response.body.data[0]; // Example: select first item
        
        cy.log('API 5 Response:', JSON.stringify(response.body));
      });
    });

    it('API 6: [PROVIDE API NAME AND ENDPOINT]', () => {
      makeRequest({
        method: 'PATCH', // UPDATE METHOD
        url: `${Cypress.env('apiUrl')}/api6-endpoint/${workflowData.api5SelectedItem.id}`,
        body: {
          // ADD REQUEST BODY USING DATA FROM PREVIOUS APIs
          updateField: 'newValue',
          relatedId: workflowData.api1Id
        }
      }).then(response => {
        expect(response.status).to.be.oneOf([200, 204]);
        
        // Store response data for next API
        workflowData.api6Response = response.body;
        
        cy.log('API 6 Response:', JSON.stringify(response.body));
      });
    });

    it('API 7: [PROVIDE API NAME AND ENDPOINT]', () => {
      makeRequest({
        method: 'POST', // UPDATE METHOD
        url: `${Cypress.env('apiUrl')}/api7-endpoint`,
        body: {
          // ADD REQUEST BODY USING DATA FROM PREVIOUS APIs
          sourceId: workflowData.api1Id,
          targetId: workflowData.api5SelectedItem.id,
          action: 'link'
        }
      }).then(response => {
        expect(response.status).to.be.oneOf([200, 201]);
        
        // Store response data for next API
        workflowData.api7Response = response.body;
        workflowData.api7LinkId = response.body.linkId; // Example: store link ID
        
        cy.log('API 7 Response:', JSON.stringify(response.body));
      });
    });

    it('API 8: [PROVIDE API NAME AND ENDPOINT]', () => {
      makeRequest({
        method: 'GET', // UPDATE METHOD
        url: `${Cypress.env('apiUrl')}/api8-endpoint/${workflowData.api7LinkId}/verify`,
        qs: {
          // ADD QUERY PARAMETERS USING DATA FROM PREVIOUS APIs
          includeDetails: true
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        
        // Store response data for next API
        workflowData.api8Response = response.body;
        
        // Validate the workflow integrity
        expect(response.body).to.have.property('sourceId', workflowData.api1Id);
        expect(response.body).to.have.property('targetId', workflowData.api5SelectedItem.id);
        
        cy.log('API 8 Response:', JSON.stringify(response.body));
      });
    });

    it('API 9: [PROVIDE API NAME AND ENDPOINT] - Cleanup/Finalize', () => {
      makeRequest({
        method: 'DELETE', // UPDATE METHOD
        url: `${Cypress.env('apiUrl')}/api9-endpoint/${workflowData.api1Id}`,
        body: {
          // ADD REQUEST BODY FOR CLEANUP
          reason: 'test_cleanup',
          cascadeDelete: true
        }
      }).then(response => {
        expect(response.status).to.be.oneOf([200, 204]);
        
        // Final validation
        workflowData.api9Response = response.body;
        
        cy.log('API 9 Response:', JSON.stringify(response.body));
        cy.log('Workflow completed successfully!');
      });
    });

    // Validation test to ensure workflow integrity
    it('Workflow Validation: Verify all APIs executed successfully', () => {
      expect(workflowData).to.have.property('api1Response');
      expect(workflowData).to.have.property('api2Response');
      expect(workflowData).to.have.property('api3Response');
      expect(workflowData).to.have.property('api4Response');
      expect(workflowData).to.have.property('api5Response');
      expect(workflowData).to.have.property('api6Response');
      expect(workflowData).to.have.property('api7Response');
      expect(workflowData).to.have.property('api8Response');
      expect(workflowData).to.have.property('api9Response');
      
      cy.log('Complete workflow data:', JSON.stringify(workflowData, null, 2));
    });
  });

  describe('Error Handling in Workflow', () => {
    it('Should handle API failure gracefully', () => {
      // Test what happens when one API in the chain fails
      makeRequest({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/invalid-endpoint`,
        body: {}
      }).then(response => {
        expect(response.status).to.be.oneOf([404, 400]);
      });
    });
  });

  describe('Performance Testing', () => {
    it('Should complete entire workflow within acceptable time', () => {
      const startTime = Date.now();
      
      // This would run a simplified version of the workflow
      // and measure total execution time
      
      cy.then(() => {
        const endTime = Date.now();
        const totalTime = endTime - startTime;
        expect(totalTime).to.be.lessThan(30000); // 30 seconds max
        cy.log(`Total workflow time: ${totalTime}ms`);
      });
    });
  });
});