import url from '../../../fixtures/urls.json';

describe('Email and send OTP',()=>{
    it('Checking Email and send OTP',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];


        cy.visit(selectUrl);
        cy.wait(1500);
        cy.contains('Login').click();
        cy.wait(1500);
        cy.get('button[type="submit"]').should('be.disabled');
        cy.wait(1500);
        cy.get('input[class="chakra-checkbox__input"]').should('be.checked');
        cy.wait(1500);
        cy.get('input[id="email"]').type('karthik.s@pococare.com');
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
        cy.get('input[id="email"]').clear();
        cy.wait(1500);
        cy.get('button[type="submit"]').should('be.disabled');
    })
})