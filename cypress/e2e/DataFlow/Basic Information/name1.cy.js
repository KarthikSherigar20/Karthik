import url from '../../../fixtures/urls.json';
import un from '../../../fixtures/UN&PASS';
import Elements from '../../../Objects/Elements';

describe('View Profile',()=>{
    it('Checking Viw Profile',()=>{
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
        cy.get('input[placeholder="Age"]').invoke('val').then(textField=>{
            const valueLength = textField.length;
            console.log('text',textField);
            console.log('valuele',valueLength);
            if(valueLength>0){
                P1.FullName1();

            }else{
                cy.get('select[class="chakra-select css-161pkch"]').eq(1).select('Male');
                cy.wait(1000);
                cy.get('div[placeholder="Age"]').type(26);
                cy.wait(1000);
                cy.get('span[class="chakra-switch__track css-p27qcy"]').click();
                cy.wait(1000);
                cy.contains('Save and continue').click();
                cy.wait(500);
            cy.get('body').then(($bodyText)=>{
                const bodyText=$bodyText.text();
            expect(bodyText).to.contains('Basic Info Updated Successfully'); 
            cy.wait(1000);
            P1.FullName1();
            })
            }
        })
    })
})