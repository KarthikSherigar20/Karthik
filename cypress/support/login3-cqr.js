import un from '../fixtures/Un&Pass.json';
import url from '../fixtures/urls.json';

let accessToken;
let refreshToken;

const login3 = () => {
  
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
    
    // Step 3: Set the tokens in cookies
    
    // cy.setCookie('adminAccessToken', accessToken);
    // cy.setCookie('adminRefreshToken', refreshToken);
    
    // Step 4: Set the tokens in session storage
    cy.wait(2000);
    cy.window().then((win) => {
      win.sessionStorage.setItem('adminAccessToken', accessToken);
      win.sessionStorage.setItem('adminRefreshToken', refreshToken);
    });
    // });
    
    // Step 5: Verify the tokens are set in cookies and log them
    
    // cy.getCookie('adminAccessToken').should('exist').then((cookie) => {
    //   cy.log('adminAccessToken:', cookie.value);
    // cy.getCookie('adminRefreshToken').should('exist').then((cookie) => {
    //   cy.log('adminRefreshToken:', cookie.value);
    // });
    
    // Step 6: If new ticket is not there create e new ticket
    cy.get('body').then(($bodyText)=>{
      const bodyText=$bodyText.text();
      if(bodyText.includes('New')){
        cy.wait(1500);
        cy.contains('New').click();
        cy.wait(1500);
        cy.get('p[class="text ticketBasicDetails_value__wibkg"]').eq(1).invoke('text').then((text)=>{
          cy.log('type',text);
          if(text.trim() === 'Company QR Code Scan'){
              cy.get('img[class="icon topcard_icon__S9x9j"]').click();
          }else{
            cy.get('input[value="no"]').scrollIntoView().click();
            cy.wait(2000);
            cy.get('body').then(($bodyText)=>{
                const bodyText=$bodyText.text();
                expect(bodyText).to.include('General Enquiry');
                cy.wait(2000);
                expect(bodyText).to.include('Test Demo');
            })
            cy.contains('Test Demo').scrollIntoView().click();
            cy.wait(2000);
            login3();
          }
      })
      }else{
          if(bodyText.includes('Work in progress')){
            cy.contains('Work in progress').click();
            cy.wait(2000);
            cy.get('body').then(($bodyText1)=>{
              const bodyText1=$bodyText1.text();
              cy.wait(2000);
              if(bodyText1.includes('Add New Location')){
                cy.wait(1500);
                cy.get('input[type="radio"]').eq(0).click();
                cy.wait(1500);
                cy.get('input[type="radio"]').eq(0).click();
                cy.wait(1500);
                cy.contains('Start Emergency').click();
                cy.wait(1500);
                cy.contains('Emergency Resolved').scrollIntoView().click();
                cy.wait(2000);
                login3();
              }else{
                cy.contains('Emergency Resolved').scrollIntoView().click();
              cy.wait(2000);
              login3();
            }
          })
          }else{
            cy.request('POST', url.CQR).then((response) => {
              cy.log('New ticket created');
              cy.wait(2000);
              cy.reload();
              cy.wait(3000);
            });
          }
      }
    })

    // cy.get('input[placeholder="Email"]').type(un.Un);
    // cy.wait(1500);
    // cy.get('input[placeholder="Password"]').type(un.Pass);
    // cy.wait(1500);
    // cy.contains('Log in').click();
    // cy.wait(1500);
  });
};



  export  default  login3;
    