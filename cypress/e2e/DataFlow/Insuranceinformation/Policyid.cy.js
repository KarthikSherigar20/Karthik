import url from '../../../fixtures/urls.json';
import Elements from '../../../Objects/Elements';

describe('Policyid',()=>{
    it('Policyid',()=>{
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
        cy.contains('Insurance Information').click();
        cy.wait(1000);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            if(bodyText.includes('Add Insurance')){
                let Policy='input[placeholder="Policy Id / E-Card Number"]';
                cy.get(Policy).type('ABBCCCDDDD');
                cy.wait(1000);
                cy.get(Policy).should('have.value','ABBCCCDDDD');
                cy.wait(1000);
            }else{
                cy.contains('Add Another Insurance').then($button=>{
                    if($button.prop('disabled')){
                        cy.log('Maximum limit is reached');
                    }else{
                        cy.contains('Add Another Insurance').click();
                        cy.wait(1000);
                        let Policy='input[placeholder="Policy Id / E-Card Number"]';
                        cy.get(Policy).type('ABBCCCDDDD');
                        cy.wait(1000);
                        cy.get(Policy).should('have.value','ABBCCCDDDD');
                        cy.wait(1000);
                        cy.contains('Cancel').click();
                    }
                })
            }
        })

    })
})