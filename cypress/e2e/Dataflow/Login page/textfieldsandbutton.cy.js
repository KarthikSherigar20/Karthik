import url from '../../../fixtures/urls.json';


describe('Textfields and button',()=>{
    it('Checking textfields and button',()=>{
    const selectedEnvironments=url.selectedEnvironment;
    const selectUrl=url.environments[selectedEnvironments];

        cy.visit(selectUrl);
        cy.wait(1500);
        cy.contains('Login').click();
        cy.wait(1500);
        cy.get('input[id="email"]').should('not.be.disabled');
        cy.wait(1500);
        cy.get('input[placeholder="Phone Number"]').should('not.be.disabled');
        cy.wait(1500);
        cy.get('button[type="submit"]').should('be.disabled');
        cy.wait(1500);
        cy.get('input[class="chakra-checkbox__input"]').should('be.checked');
    })
})