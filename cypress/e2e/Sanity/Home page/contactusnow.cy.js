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

    })
})