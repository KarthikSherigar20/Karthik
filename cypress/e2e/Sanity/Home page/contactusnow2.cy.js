import url from '../../../fixtures/urls.json';

describe('contact us now', () => {
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
        cy.get('body')
            .should('contain', 'info@pococare.com').scrollIntoView();
        let fullname = 'input[placeholder="Full Name*"]';
        cy.get(fullname).scrollIntoView().should('be.visible').should('not.be.disabled')
            .type('aaaaaaaaaaaaa').should('have.value', 'aaaaaaaaaaaaa');
        cy.wait(1000);
        cy.get(fullname).clear();
        cy.wait(1000);
        let email = 'input[placeholder="Email*"]';
        cy.get(email).scrollIntoView().should('be.visible').should('not.be.disabled')
            .type('aaaaaaaaaaaaa').should('have.value', 'aaaaaaaaaaaaa');
        cy.wait(1000);
        cy.get(email).clear();
        cy.wait(1000);
        let Pnumber = 'input[placeholder="Phone Number"]';
        cy.get(Pnumber).scrollIntoView().should('be.visible').should('not.be.disabled')
            .type('9999999999').should('have.value', '9999999999');
        cy.wait(1000);
        cy.get(Pnumber).clear();
        cy.wait(1000);
        let Subject = 'select[class="wpcf7-form-control wpcf7-select wpcf7-validates-as-required form-style"]';
        cy.get(Subject).scrollIntoView().should('be.visible').should('not.be.disabled')
            .select('Requesting a demonstration').should('have.value', 'Requesting a demonstration');
        cy.wait(1000);
        // cy.get(Subject).clear();
        cy.wait(1000);
        let message = 'textarea[placeholder="Message"]';
        cy.get(message).scrollIntoView().should('be.visible').should('not.be.disabled')
            .type('aaaaaaaaaaaaa').should('have.value', 'aaaaaaaaaaaaa');
        cy.wait(1000);
        cy.get(message).clear();
        cy.wait(1000);
        cy.contains('Submit').scrollIntoView().should('be.visible').should('not.be.disabled');
    })
})