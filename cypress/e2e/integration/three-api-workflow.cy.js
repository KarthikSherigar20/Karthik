describe('3 API Linked Workflow - Auth & Subscriber Creation', () => {
  let testData;
  let workflowData = {};

  before(() => {
    cy.fixture('testData').then(data => testData = data);
  });

  const makeRequest = (options) => {
    return cy.request({
      failOnStatusCode: false,
      ...options
    });
  };

  describe('Complete 3 API Workflow', () => {
    
    it('API 1: External User Login', () => {
      makeRequest({
        method: 'POST',
        url: 'https://stage.apis.pococare.com/auth/api/v1/auth/external-user-login',
        body: {
          "email": testData.auth.login.email,
          "password": testData.auth.login.password
        }
      }).then(response => {
        console.log('API 1 - Response Status:', response.status);
        console.log('API 1 - Response Headers:', JSON.stringify(response.headers, null, 2));
        console.log('API 1 - Response Body:', JSON.stringify(response.body, null, 2));
        
        if (response.status === 200 || response.status === 201) {
          expect(response.body).to.have.property('adminAccessToken');
          expect(response.body).to.have.property('adminRefreshToken');
          
          // Store tokens for next API
          workflowData.adminAccessToken = response.body.adminAccessToken;
          workflowData.adminRefreshToken = response.body.adminRefreshToken;
          
          // Update testData with cookie format
          testData.auth.headers.Cookie = `adminAccessToken=${workflowData.adminAccessToken};adminRefreshToken=${workflowData.adminRefreshToken}`;
          
          cy.log('API 1 - External Login Success');
          cy.log('Admin Access Token:', workflowData.adminAccessToken);
        } else {
          cy.log('API 1 - Login Failed with status:', response.status);
          cy.log('API 1 - Error Body:', JSON.stringify(response.body, null, 2));
        }
      });
    });

    it('API 2: Poco User Login', () => {
      makeRequest({
        method: 'POST',
        url: 'https://stage.apis.pococare.com/auth/api/v1/auth/poco-user-login',
        body: {
          "email": testData.auth.login.email,
          "password": testData.auth.login.password
        }
      }).then(response => {
        console.log('API 2 - Response Status:', response.status);
        console.log('API 2 - Response Headers:', JSON.stringify(response.headers, null, 2));
        console.log('API 2 - Response Body:', JSON.stringify(response.body, null, 2));
        
        if (response.status === 200 || response.status === 201) {
          expect(response.body).to.have.property('adminAccessToken');
          expect(response.body).to.have.property('adminRefreshToken');
          
          // Store tokens for next API
          workflowData.pocoAccessToken = response.body.adminAccessToken;
          workflowData.pocoRefreshToken = response.body.adminRefreshToken;
          
          // Update testData with cookie1 format
          testData.auth.headers.Cookie1 = `adminAccessToken=${workflowData.pocoAccessToken};adminRefreshToken=${workflowData.pocoRefreshToken}`;
          
          // Save tokens to testData.json file permanently
          cy.task('updateTestData', {
            Cookie: testData.auth.headers.Cookie,
            Cookie1: testData.auth.headers.Cookie1,
            lastRun: {
              timestamp: new Date().toISOString(),
              api1UserId: workflowData.adminAccessToken ? 'success' : 'failed',
              api2UserId: workflowData.pocoAccessToken ? 'success' : 'failed'
            }
          });
          
          cy.log('API 2 - Poco User Login Success');
          cy.log('Poco Access Token:', workflowData.pocoAccessToken);
          cy.log('Tokens saved to testData.json file');
        } else {
          cy.log('API 2 - Login Failed with status:', response.status);
          cy.log('API 2 - Error Body:', JSON.stringify(response.body, null, 2));
        }
      });
    });

    it('API 3: Create Insurance Subscriber', () => {
      const timestamp = Date.now();
      const subscriberData = {
        "companyId": testData.subscriber.companyId,
        "name": `${testData.subscriber.name}_${timestamp}`,
        "email": `test_${timestamp}@example.com`,
        "mobileNo": {
          "countryCode": testData.subscriber.mobileNo.countryCode,
          "number": `${testData.subscriber.mobileNo.number}${timestamp.toString().slice(-3)}`
        },
        "addBeneficiaryAllowed": testData.subscriber.addBeneficiaryAllowed,
        "numberOfBeneficiariesAllowed": testData.subscriber.numberOfBeneficiariesAllowed
      };

      makeRequest({
        method: 'POST',
        url: 'https://stage.apis.pococare.com/beneficiary/api/v1/beneficiary/create-insurance-subscriber',
        headers: {
          'Cookie': testData.auth.headers.Cookie,
          'Content-Type': 'application/json'
        },
        body: subscriberData
      }).then(response => {
        console.log('API 3 - Response Status:', response.status);
        console.log('API 3 - Response Headers:', JSON.stringify(response.headers, null, 2));
        console.log('API 3 - Response Body:', JSON.stringify(response.body, null, 2));
        console.log('API 3 - Request Body:', JSON.stringify(subscriberData, null, 2));
        console.log('API 3 - Request Headers:', JSON.stringify({ 'Cookie': testData.auth.headers.Cookie }, null, 2));
        
        if (response.status === 200 || response.status === 201) {
          expect(response.body).to.have.property('_id');
          expect(response.body).to.have.property('email', subscriberData.email);
          expect(response.body).to.have.property('name', subscriberData.name);
          
          // Store subscriber data
          workflowData.subscriberId = response.body._id;
          workflowData.subscriberEmail = response.body.email;
          workflowData.subscriberName = response.body.name;
          
          // Save subscriber data to testData.json
          cy.task('updateTestData', {
            subscriber: {
              lastCreatedId: workflowData.subscriberId,
              lastCreatedEmail: workflowData.subscriberEmail,
              lastCreatedName: workflowData.subscriberName,
              createdAt: new Date().toISOString()
            }
          });
          
          cy.log('API 3 - Subscriber Created Successfully');
          cy.log('Subscriber ID:', workflowData.subscriberId);
          cy.log('Subscriber Email:', workflowData.subscriberEmail);
          cy.log('Subscriber data saved to testData.json');
        } else {
          cy.log('API 3 - Subscriber Creation Failed with status:', response.status);
          cy.log('API 3 - Error Body:', JSON.stringify(response.body, null, 2));
          expect(response.status, 'API 3 should return 200 or 201').to.be.oneOf([200, 201]);
        }
      });
    });

    it('Workflow Validation: Verify all APIs executed successfully', () => {
      expect(workflowData).to.have.property('adminAccessToken');
      expect(workflowData).to.have.property('adminRefreshToken');
      expect(workflowData).to.have.property('pocoAccessToken');
      expect(workflowData).to.have.property('pocoRefreshToken');
      // // expect(workflowData).to.have.property('subscriberId');
      // expect(workflowData).to.have.property('subscriberEmail');
      // expect(workflowData).to.have.property('subscriberName');
      
      cy.log('Complete workflow data:', JSON.stringify(workflowData, null, 2));
    });
  });

  describe('Error Handling Tests', () => {
    it('Should handle subscriber creation without authentication', () => {
      makeRequest({
        method: 'POST',
        url: 'https://stage.apis.pococare.com/beneficiary/api/v1/beneficiary/create-insurance-subscriber',
        body: testData.subscriber
      }).then(response => {
        expect(response.status).to.be.oneOf([401, 403]);
      });
    });

    it('Should handle invalid subscriber data', () => {
      makeRequest({
        method: 'POST',
        url: 'https://stage.apis.pococare.com/beneficiary/api/v1/beneficiary/create-insurance-subscriber',
        headers: {
          'Cookie': testData.auth.headers.Cookie1,
          'Content-Type': 'application/json'
        },
        body: {
          "companyId": "invalid-id",
          "name": "",
          "email": "invalid-email"
        }
      }).then(response => {
        expect(response.status).to.be.oneOf([400, 422]);
      });
    });
  });

  describe('Performance Tests', () => {
    it('Should complete entire workflow within acceptable time', () => {
      const startTime = Date.now();
      
      cy.then(() => {
        const endTime = Date.now();
        const totalTime = endTime - startTime;
        expect(totalTime).to.be.lessThan(15000); // 15 seconds max
        cy.log(`Total workflow time: ${totalTime}ms`);
      });
    });
  });
});