import url from '../../../fixtures/urls.json';
import un from '../../../fixtures/UN&PASS';
import Elements from '../../../Objects/Elements';

describe('Landmark',()=>{
    it('Age',()=>{
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
        cy.contains('Address').click();
        cy.wait(1000);
        cy.contains('Add Another Address').then($button=>{
            if($button.prop('disabled')){
                cy.log('Maximum limit is reached');
            }else{
                cy.contains('Add Another Address').click();
                cy.wait(1000);
                cy.contains('Add New').click();
                cy.wait(1000);
                cy.get('input[placeholder="Landmark"]').scrollIntoView().type('near ****');
                cy.wait(1000);
                cy.get('input[placeholder="Landmark"]').scrollIntoView().should('have.value','near ****');
                cy.wait(1000);
                cy.contains('Cancel').click();
            }
        })

    })
})