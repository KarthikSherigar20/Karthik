import url from 'D:/Cypress/cypress3/cypress/fixtures/urls.json';

describe('contact us now',()=>{
    it('checking CUN page',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];


        cy.visit(selectUrl);
        cy.wait(1500);
        const name='Contact us Now';
        cy.contains(name).should('be.visible').scrollIntoView();
        cy.wait(1500);
        cy.contains(name).click();
        cy.wait(1500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('Send Message');
            let name='input[placeholder="Name"]';
            cy.get(name).scrollIntoView().should('be.visible').should('not.be.disabled')
            .type('aaaaaaaaaaaaa').should('have.value','aaaaaaaaaaaaa');
            cy.wait(1000);
            cy.get(name).clear();
            cy.wait(1000);
            let email='input[placeholder="Email"]';
            cy.get(email).scrollIntoView().should('be.visible').should('not.be.disabled')
            .type('aaaaaaaaaaaaa').should('have.value','aaaaaaaaaaaaa');
            cy.wait(1000);
            cy.get(email).clear();
            cy.wait(1000);
            let Pnumber='input[placeholder="Phone Number"]';
            cy.get(Pnumber).scrollIntoView().should('be.visible').should('not.be.disabled')
            .type('9999999999').should('have.value','9999999999');
            cy.wait(1000);
            cy.get(Pnumber).clear();
            cy.wait(1000);
            let Subject='input[placeholder="Subject"]';
            cy.get(Subject).scrollIntoView().should('be.visible').should('not.be.disabled')
            .type('aaaaaaaaaaaaa').should('have.value','aaaaaaaaaaaaa');
            cy.wait(1000);
            cy.get(Subject).clear();
            cy.wait(1000);
            let message='textarea[placeholder="message"]';
            cy.get(message).scrollIntoView().should('be.visible').should('not.be.disabled')
            .type('aaaaaaaaaaaaa').should('have.value','aaaaaaaaaaaaa');
            cy.wait(1000);
            cy.get(message).clear();
            cy.wait(1000);
            cy.contains('Send Message').scrollIntoView().should('be.visible').should('not.be.disabled');
        })
    })
})