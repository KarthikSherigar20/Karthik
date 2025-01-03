import un from '../fixtures/Un&Pass.json';
import url from '../fixtures/urls.json';

let accessToken;
let refreshToken;

const login1 = () => {
  
  // Step 1: Select the environment and visit the corresponding URL
  const selectedEnvironment = url.SelectedEnvironment;
  const selectUrl = url.Enviroments[selectedEnvironment];    
  // Visit the URL
  cy.visit(selectUrl);
  
  // Step 2: Login via API to get the tokens
  cy.request({
    method: 'POST',
    url: url.PL, // Replace with your API login endpoint
    body: {
      email: un.Un,
      password: un.Pass
    }
  }).then((response) => {
    expect(response.status).to.eq(201);
    cy.wait(1500);
    accessToken = response.body.adminAccessToken;
    refreshToken = response.body.adminRefreshToken;
    cy.wait(2000);
    cy.window().then((win) => {
      win.sessionStorage.setItem('adminAccessToken', accessToken);
      win.sessionStorage.setItem('adminRefreshToken', refreshToken);
    });
    cy.get('body').then(($bodyText)=>{
      const bodyText=$bodyText.text();
      if(bodyText.includes('New')){
        cy.log('New ticket already present')
      }else{
          if(bodyText.includes('Work in progress')){
            cy.contains('Work in progress').click();
            cy.wait(2000);
            cy.get('body').then(($bodyText1)=>{
              const bodyText1=$bodyText1.text();
              if(bodyText1.includes('Add New Location')){
                cy.get('input[name="addressSelection"]').eq(0).click();
                cy.wait(2000);
                cy.get('input[type="radio"]').eq(0).click();
                cy.wait(2000);
                cy.contains('Start Emergency').click();
                cy.wait(2000);
              }
            })
          }else{
            cy.request('GET', url.Api).then((response) => {
              cy.log('New ticket created');
              cy.wait(2000);
              cy.reload();
              cy.wait(3000);
            });
          }
      }
    })

  });
};



  export  default  login1;
    