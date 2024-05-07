import url from '../../../fixtures/urls.json';
import un from '../../../fixtures/UN&PASS';
import Elements from '../../../Objects/Elements';

describe('TPA',()=>{
    it('TPA',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];
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
        cy.contains('Medical Profile').click();
        cy.wait(1000);
        let TPA='div[class="dropdown-heading-value"]';
        cy.get(TPA).click();
        cy.wait(1000);
        cy.contains('Chronic Kidney Disease').click();
        cy.wait(1000);
        cy.get(TPA).click();
        cy.wait(1000);
        cy.get('body').then($bodyText=>{
            const bodyText=$bodyText.text();
        expect(bodyText).to.include('Chronic Kidney Disease');
        })
    })
})