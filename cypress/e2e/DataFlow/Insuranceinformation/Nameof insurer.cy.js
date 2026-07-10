import url from '../../../fixtures/urls.json';
import un from '../../../fixtures/UN&PASS';
import Elements from '../../../Objects/Elements';

describe('Insuranceype',()=>{
    it('Insuranceype',()=>{
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
                let Insurance='input[placeholder="Name of Insurance Company"]';
                cy.get(Insurance).type('Others');
                cy.wait(1000);
                cy.get(Insurance).should('have.value','Others');
                cy.wait(1000);
            }else{
        cy.contains('Add Another Insurance').then($button=>{
            if($button.prop('disabled')){
                cy.log('Maximum limit is reached');
            }else{
                cy.contains('Add Another Insurance').click();
                cy.wait(1000);
                let Insurance='input[placeholder="Name of insurer"]';
                cy.get(Insurance).type('Others');
                cy.wait(1000);
                cy.get(Insurance).should('have.value','Others');
                cy.wait(1000);
                cy.contains('Cancel').click();
            }
        })
        }
    })

    })
})