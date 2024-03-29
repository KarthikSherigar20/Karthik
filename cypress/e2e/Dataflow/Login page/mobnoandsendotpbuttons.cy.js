import url from '../../../fixtures/urls.json';

describe('Phoneno and send OTP',()=>{
    it('Checking Phonenumber and send OTP',()=>{
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
        cy.get('input[placeholder="Phone Number"]').type('9019803837');
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
        cy.get('button[type="submit"]').should('be.disabled');
    })
})