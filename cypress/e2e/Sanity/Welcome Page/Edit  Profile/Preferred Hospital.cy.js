import url from '../../../../fixtures/urls.json';
import un from '../../../../fixtures/UN&PASS.json';
import Elements from '../../../../Objects/Elements';

describe('Basic information',()=>{
    it('Checking Basic information page',()=>{
        const selectedEnvironment=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironment];

        cy.visit(selectUrl);
        const P1=new Elements();
        cy.wait(1500);
        cy.contains('Login').click();
        cy.wait(1500);
        cy.get('input[id="email"]').type(un.Un);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
        cy.wait(3500);
        P1.PTA();
        cy.wait(1000);
        P1.OTP();
        cy.wait(1000);
        cy.contains('Verify').click();
        cy.wait(1500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            if(bodyText.includes('Edit Profile')){
                cy.contains('Edit Profile').click();
            }else{
            cy.contains('Complete Profile').eq(0).click();
            }
        })
        cy.contains('Preferred Hospital').click();
        cy.wait(1000);
        cy.contains('Add Hospital').scrollIntoView().should('be.visible').should('not.be.disabled').click();
        cy.wait(1000);
        cy.get('input[placeholder="Enter City Name"]').scrollIntoView().should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.get('input[placeholder="Enter Hospital Name"]').scrollIntoView().should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.contains('Save').scrollIntoView().should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.contains('Cancel').scrollIntoView().should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.get('button[class="chakra-modal__close-btn css-1ik4h6n"]').scrollIntoView().should('be.visible').should('not.be.disabled').click();
    })
})