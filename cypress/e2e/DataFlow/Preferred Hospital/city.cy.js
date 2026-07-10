import url from '../../../fixtures/urls.json';
import un from '../../../fixtures/UN&PASS';
import Elements from '../../../Objects/Elements';

describe('cityype',()=>{
    it('cityype',()=>{
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
        cy.contains('Preferred Hospital').click();
        cy.wait(1000);
        cy.contains('Preferred Hospital').then($button=>{
            if($button.prop('disabled')){
                cy.log('Maximum limit is reached');
            }else{
                cy.contains('Add Hospital').scrollIntoView().click();
                cy.wait(1000);
                let city='input[placeholder="Enter City Name"]';
                cy.get(city).type('Others');
                cy.wait(1000);
                cy.get(city).should('have.value','Others');
                cy.wait(1000);
                cy.contains('Cancel').click();
            }
        })

    })
})