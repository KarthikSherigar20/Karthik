import url from '../../../fixtures/urls.json';


describe('Textfields and button',()=>{
    it('Checking textfields and button',()=>{
    const selectedEnvironments=url.selectedEnvironment;
    const selectUrl=url.environments[selectedEnvironments];

        cy.visit(selectUrl);
        cy.wait(1500);
        cy.get('input[placeholder="Email"]').should('not.be.disabled');
        cy.wait(1500);
        cy.get('input[placeholder="Phone number"]').should('not.be.disabled');
        cy.wait(1500);
        cy.contains('Get OTP').scrollIntoView().should('be.disabled');
        cy.wait(1500);
        cy.get('input[class="chakra-checkbox__input"]').should('be.checked');
    })
})