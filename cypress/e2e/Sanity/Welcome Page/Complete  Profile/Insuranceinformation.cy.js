import url from '../../../../fixtures/urls.json';
import un from '../../../../fixtures/UN&PASS.json';

describe('Basic information',()=>{
    it('Checking Basic information page',()=>{
        const selectedEnvironment=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironment];

        cy.visit(selectUrl);
        cy.wait(1500);
        cy.contains('Login').click();
        cy.wait(1500);
        cy.get('input[id="email"]').type(un.Un);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
        cy.wait(10000);
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
        cy.contains('Insurance Information').click();
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            if(bodyText.includes('Add Insurance')){
                cy.get('input[placeholder="Policy Id / E-Card Number"]').should('be.visible').should('not.be.disabled');
                cy.wait(1000);
                cy.get('input[placeholder="TPA (Third Party Administrator) Name"]').should('be.visible').should('not.be.disabled');
                cy.wait(1000);
                cy.get('select[class="chakra-select css-161pkch"]').then((dropdown)=>{
                    const previosly=dropdown.val();
                    cy.get('select[class="chakra-select css-161pkch"]').find('option').then((Options)=>{
                        const actual=[...Options].map(o=>o.value)
                        for(let i=0;i<actual.length;i++){
                            cy.get('select[class="chakra-select css-161pkch"]').select(actual[i]);
                            cy.wait(500);
                        }
                    });cy.get('select[class="chakra-select css-161pkch"]').select(previosly);
                })
                cy.contains('Upload Document').should('be.visible').should('not.be.disabled');
                cy.wait(1000);
                cy.contains('Add Insurance').should('be.visible').should('not.be.disabled');
                cy.wait(1000);
                cy.get('svg[class="InsuranceInfo_controllerIcon__6F6ca"]').should('be.visible').should('not.be.disabled');
            }else{
                cy.contains('Add Another Insurance').should('be.visible').click();
                cy.wait(1000);
                cy.get('input[placeholder="Policy Id / E-Card Number"]').should('be.visible').should('not.be.disabled');
                cy.wait(1000);
                cy.get('input[placeholder="TPA (Third Party Administrator) Name"]').should('be.visible').should('not.be.disabled');
                cy.wait(1000);
                cy.get('select[class="chakra-select css-161pkch"]').then((dropdown) => {
                    const previouslySelected = dropdown.val();
                    cy.get('select[class="chakra-select css-161pkch"] option').then((options) => {
                        const actual = [...options].map(option => option.value);
                        for (let i = 0; i < actual.length; i++) {
                            cy.get('select[class="chakra-select css-161pkch"]').select(actual[i]);
                            cy.wait(500);
                        }
                    });
                    cy.get('select[class="chakra-select css-161pkch"]').select(previouslySelected);
                });
                cy.get('input[placeholder="Name of insurer"]').should('be.visible').should('not.be.disabled');
                cy.wait(1000);
                cy.contains('Upload Document').should('be.visible').should('not.be.disabled');
                cy.wait(1000);
                cy.contains('Add').should('be.visible').should('not.be.disabled');
                cy.wait(1000);
                cy.contains('Cancel').should('be.visible').should('not.be.disabled');
                cy.wait(1000);
                cy.get('button[class="chakra-modal__close-btn css-1ik4h6n"]').should('be.visible').should('not.be.disabled').click();
                cy.wait(1000);
                cy.get('svg[class="InsuranceInfo_controllerIcon__6F6ca"]').eq(0).should('be.visible').should('not.be.disabled');
                cy.wait(1000);
                cy.get('svg[class="InsuranceInfo_controllerIcon__6F6ca"]').eq(1).should('be.visible').should('not.be.disabled');
                cy.wait(1000);
            }
        })
    })
})
