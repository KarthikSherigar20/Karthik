import url from '../../../fixtures/urls.json';

describe('Email&mobilno. and otp page',()=>{
    it('Email&mobilno. and otp page',()=>{
     const selectedEnvironment=url.selectedEnvironment;
     const selectUrl=url.environments[selectedEnvironment];


        cy.visit(selectUrl);
        cy.wait(1500);
        cy.contains('Login').click();
        cy.wait(1500);
        cy.get('input[id="email"]').type('karthik.s@pococare.com');
        cy.wait(1500);
        cy.get('input[placeholder="Phone Number"]').type('9019803837');
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