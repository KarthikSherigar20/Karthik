import url from '../../../fixtures/urls.json';
import Elements from '../../../Objects/Elements';

describe('TPA',()=>{
    it('TPA',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];
        cy.visit(selectUrl);
        const P1=new Elements();
        P1.login();
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
        cy.contains('Type 2 Diabetics Mellitus').click();
        cy.wait(1000);
        cy.get(TPA).click();
        cy.wait(1000);
        cy.get('body').then($bodyText=>{
            const bodyText=$bodyText.text();
        expect(bodyText).to.include('Type 2 Diabetics Mellitus');
        })
    })
})