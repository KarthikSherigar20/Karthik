import url from '../../../fixtures/urls.json';
import Elements from '../../../Objects/Elements';

describe('BG',()=>{
    it('BG',()=>{
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
        let BG='select[class="chakra-select css-161pkch"]';
        cy.wait(1000);
        cy.get(BG).eq(0).select('A-');
        cy.wait(1000);
        cy.get(BG).eq(0).should('have.value','A-');

    })
})