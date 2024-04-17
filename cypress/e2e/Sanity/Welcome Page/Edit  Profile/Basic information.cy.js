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
        cy.wait(1500);
        cy.contains('Basic Information').should('be.visible').should('not.be.disabled').click();
        cy.wait(1500);
        cy.get('select[class="chakra-select css-161pkch"]').eq(0).should('exist').should('be.disabled');
        cy.wait(1500);
        cy.get('input[placeholder="Full Name"]').should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.get('select[class="chakra-select css-161pkch"]').eq(1).should('be.visible').should('not.be.disabled');
        cy.wait(1500);

        cy.get('select[class="chakra-select css-161pkch"]').eq(1).then((dropdown)=>{
        let previouslyselectedoption=dropdown.val();
        cy.get('select[class="chakra-select css-161pkch"]').eq(1).find('option').then(options => {
            const actual = [...options].map(o => o.value)
            console.log('options',actual);
            // expect(actual).to.deep.eq(['', 'Male', 'Female'])
            for (let i = 0; i < actual.length; i++) {
                cy.get('select[class="chakra-select css-161pkch"]').eq(1).select(actual[i]).should('have.value',actual[i])
                .should('be.visible').should('not.be.disabled');
                cy.wait(2000); // Optional: Wait for some time after selecting each option
            }
            cy.get('select[class="chakra-select css-161pkch"]').eq(1).select(previouslyselectedoption);
        })
    })
        
        cy.get('input[placeholder="Age"]').should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.get('input[placeholder="Email"]').should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.get('input[placeholder="Phone Number"]').should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.get('span[class="chakra-switch__thumb css-7roig"]').should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.contains('Save and continue').should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.get('svg[class="BasicInfo_greenIcon__ixaNK"]').should('be.visible').should('not.be.disabled').click();
        cy.wait(1500);
        cy.get('body').contains('Add Another Address').should('exist');

    })
})