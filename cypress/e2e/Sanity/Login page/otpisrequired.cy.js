import url from '../../../fixtures/urls.json';
import un from '../../../fixtures/UN&PASS.json';

describe('Otp is required',()=>{
    it('Checking OTP is required message',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];

        cy.visit(selectUrl);
        cy.wait(1500);
        cy.contains('Login').click();
        cy.wait(1500);
        cy.get('input[id="email"]').type(un.Un);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
        cy.wait(1500);
        cy.contains('Verify').click();
        cy.wait(1500);
        cy.get('body').contains('OTP is required').should('exist');
        cy.wait(1500);




    })
})