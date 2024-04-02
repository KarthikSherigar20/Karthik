import url from '../../../fixtures/urls.json';
import un from '../../../fixtures/UN&PASS.json';

describe('Email&Phoneno and send OTP',()=>{
    it('Checking Email&Phonenumber and send OTP',()=>{
        const selectedEnviroments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnviroments];

        cy.visit(selectUrl);
        cy.wait(1500);
        cy.contains('Login').click();
        cy.wait(1500);
        cy.get('button[type="submit"]').should('be.disabled');
        cy.wait(1500);
        cy.get('input[class="chakra-checkbox__input"]').should('be.checked');
        cy.wait(1500);
        cy.get('input[id="email"]').type(un.Un);
        cy.wait(1500);
        cy.get('button[type="submit"]').should('not.be.disabled');
        cy.wait(1500);
        cy.get('input[placeholder="Phone Number"]').type(un.PhoneNo);
        cy.wait(1500);
        cy.get('button[type="submit"]').should('not.be.disabled');
        cy.wait(1500);
        cy.get('input[class="chakra-checkbox__input"]').click({force:true});
        cy.wait(1500);
        cy.get('button[type="submit"]').should('be.disabled');
        cy.wait(1500);
        cy.get('input[class="chakra-checkbox__input"]').click({force:true});
        cy.wait(1500);
        cy.get('button[type="submit"]').should('not.be.disabled');
        cy.wait(1500);
        cy.get('input[placeholder="Phone Number"]').clear();
        cy.wait(1500);
        cy.get('button[type="submit"]').should('not.be.disabled');
        cy.wait(1500);
        cy.get('input[placeholder="Phone Number"]').type(un.PhoneNo);
        cy.wait(1500);
        cy.get('input[id="email"]').clear();
        cy.wait(1500);
        cy.get('button[type="submit"]').should('not.be.disabled');
        cy.wait(1500);
        cy.get('input[placeholder="Phone Number"]').clear();
        cy.wait(1500);
        cy.get('button[type="submit"]').should('be.disabled');
    })
})