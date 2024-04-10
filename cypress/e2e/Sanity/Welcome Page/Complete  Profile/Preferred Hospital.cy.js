import url from '../../../../fixtures/urls.json';
import un from '../../../../fixtures/UN&PASS.json';

describe('Basic information',()=>{
    it('Checking Basic information page',()=>{
        const selectedEnvironment=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironment];

        cy.visit(selectUrl);
        cy.wait(1500);
        cy.contains('Login').click();
        cy.wait(1500);
        cy.get('input[id="email"]').type(un.Un);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
        cy.wait(10000);
        cy.contains('Verify').click();
        cy.wait(1500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            if(bodyText.includes('Edit Profile')){
                click();
            }else{
            cy.contains('Complete Profile').eq(0).click();
            }
        })
        cy.contains('Preferred Hospital').click();
        cy.wait(1000);
        cy.contains('Add Hospital').should('be.visible').should('not.be.disabled').click();
        cy.wait(1000);
        cy.get('input[placeholder="Enter City Name"]').should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.get('input[placeholder="Enter Hospital Name"]').should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.contains('Save').should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.contains('Cancel').should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.get('button[class="chakra-button chakra-menu__menu-button css-7pfzb9"]').should('be.visible').should('not.be.disabled').click();
    })
})