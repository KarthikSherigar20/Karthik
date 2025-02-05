import un from '../fixtures/Un&Pass.json';
import url from '../fixtures/urls.json';

let accessToken;
let refreshToken;

const login = () => {
    const selectedEnvironment = url.SelectedEnviornment;
    const selectUrl = url.Environments[selectedEnvironment];

    const selectedApi = url.SelectedApi;
    const selectApi = url.Apis[selectedApi];

    cy.visit(selectUrl);

    // Handle any alert pop-ups in the UI
    cy.on('window:alert', (alertText) => {
        cy.log(`Alert detected: ${alertText}`);
        if (alertText.includes('Something went wrong')) {
            cy.log('Retrying login due to alert...');
            login(); // Retry login if the alert is detected
        }
    });

    cy.request({
        method: "POST",
        url: selectApi,
        body: {
            email: un.Un,
            password: un.Pass
        },
        failOnStatusCode: false // Prevent Cypress from failing on non-2xx status codes
    }).then((response) => {
        if (response.status === 201) {
            accessToken = response.body.adminAccessToken;
            refreshToken = response.body.adminRefreshToken;

            cy.window().then((win) => {
                win.sessionStorage.setItem('adminAccessToken', accessToken);
                win.sessionStorage.setItem('adminRefreshToken', refreshToken);
            });

            cy.log('Login successful');
        } else {
            cy.log(`Login failed with status ${response.status}: Retrying...`);
            cy.wait(1000); // Small wait before retrying
            login(); // Retry login if the status is not 201
        }
    });
};

export default login;
