import un from '../fixtures/Un&Pass.json';
import url from '../fixtures/urls.json';

let accessToken;
let refreshToken;

const login =() =>{

    const selectedEnviornment= url.SelectedEnviornment;
    const selectUrl = url.Environments[selectedEnviornment];

    const selectedApi=url.SelectedApi;
    const selectapi=url.Apis[selectedApi];

    cy.visit(selectUrl);

    cy.request({
        method:"POST",
        url:selectapi,
        body:{
            email:un.Un,
            password:un.Pass
        }
    }).then((response)=>{
        expect(response.status).to.eq(201);
        cy.wait(200);
        accessToken=response.body.adminAccessToken;
        refreshToken=response.body.adminRefreshToken;

        cy.wait(200);
        cy.window().then((win)=>{
            win.sessionStorage.setItem('adminAccessToken',accessToken);
            win.sessionStorage.setItem('adminRefreshToken',refreshToken);
        })
    })
}

export default login;