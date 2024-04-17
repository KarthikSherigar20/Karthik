import url from '../../../fixtures/urls.json';
import un from '../../../fixtures/UN&PASS';

describe('View Profile',()=>{
    it('Checking Viw Profile',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];
        cy.visit(selectUrl);
        cy.wait(1500);
        cy.contains('Login').click();
        cy.wait(1500);
        cy.get('input[id="email"]').type(un.Un);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
        cy.wait(15000);
        cy.contains('Verify').click();
        cy.wait(1500);
        cy.get('button[class="chakra-button chakra-menu__menu-button css-7pfzb9"]').should('not.be.disabled').should('be.visible').click();
        cy.wait(1500);
        cy.get('button[class="chakra-menu__menuitem css-18esm8n"]').eq(0).should('not.be.disabled').should('be.visible').click();
        cy.wait(1500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
        expect(bodyText).to.includes('Your Pococare Emergency Ready Kit (PERK)');
        cy.get('p[class="chakra-text css-d8hhf9"]').should('be.visible').should('not.be.disabled').click();
        cy.wait(1000);
        cy.get('button[class="chakra-button chakra-menu__menu-button css-7pfzb9"]').should('not.be.disabled').should('be.visible').click();
        cy.wait(1500);
        cy.get('button[class="chakra-menu__menuitem css-18esm8n"]').eq(1).should('not.be.disabled').should('be.visible').click();
        cy.wait(1500);
        expect(bodyText).to.includes('Home');
    })
    })
})