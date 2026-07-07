import url from '../../../fixtures/urls.json';

describe('Contact Us', () => {
    it('checking CUN page', () => {
        const selectedEnvironments = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironments];


        cy.visit(selectUrl);
        cy.wait(1500);
        const name = 'Contact Us';
        cy.contains(name).should('be.visible').scrollIntoView();
        cy.wait(1500);
        cy.contains(name).click();
        cy.wait(1500);
        cy.contains('Do you have any questions about Pococare?').should('be.visible').scrollIntoView();
        cy.get('input[placeholder="Full Name*"]').should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.get('input[placeholder="Email*"]').should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.get('input[placeholder="Phone Number"]').should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.get('select[class="wpcf7-form-control wpcf7-select wpcf7-validates-as-required form-style"]').should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.get('textarea[placeholder="Message"]').should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.contains('Submit').should('be.visible').should('not.be.disabled');
    })
})