import url from '../../../fixtures/urls.json';
import un from '../../../fixtures/UN&PASS.json';

describe('Email and send OTP',()=>{
    it('Checking Email and send OTP',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];


        cy.visit(selectUrl);
        cy.wait(1500);
        cy.contains('Get OTP').should('be.disabled');
        cy.wait(1500);
        cy.get('input[class="chakra-checkbox__input"]').should('be.checked');
        cy.wait(1500);
        cy.get('input[placeholder="Email"]').type(un.Un);
        cy.wait(1500);
        cy.contains('Get OTP').should('not.be.disabled');
        cy.wait(1500);
        cy.get('input[class="chakra-checkbox__input"]').click({force:true});
        cy.wait(1500);
        cy.contains('Get OTP').should('not.be.disabled');
        cy.wait(1500);
        cy.get('input[class="chakra-checkbox__input"]').click({force:true});
        cy.wait(1500);
        cy.contains('Get OTP').should('not.be.disabled');
        cy.wait(1500);
        cy.get('input[placeholder="Email"]').clear();
        cy.wait(1500);
        cy.contains('Get OTP').should('be.disabled');
    })
})