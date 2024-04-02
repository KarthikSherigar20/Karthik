import url from '../../../fixtures/urls.json';
import un from '../../../fixtures/UN&PASS.json';

describe('Email and otp page',()=>{
    it('Email and otp page',()=>{
     const selectedEnvironment=url.selectedEnvironment;
     const selectUrl=url.environments[selectedEnvironment];


        cy.visit(selectUrl);
        cy.wait(1500);
        cy.contains('Login').click();
        cy.wait(1500);
        cy.get('input[id="email"]').type(un.Un);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
        cy.wait(1500);
        cy.get('body').contains('Enter OTP').should('exist');
        cy.wait(1500);
        cy.get('body').contains("We've sent the OTP to your phone or email!").should('exist');
        cy.wait(1500);
        cy.contains('Verify').should('not.be.disabled');
        cy.wait(30000);
        cy.contains('Resend OTP').click();
        cy.wait(1500);
        cy.contains('Not received OTP?').should('not.exist');
        cy.wait(1500);
        cy.get('body').contains("OTP has been sent to your number").should('exist');

    })
})