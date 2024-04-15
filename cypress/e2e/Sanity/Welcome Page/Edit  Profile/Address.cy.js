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
        cy.wait(15000);
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
        cy.contains('Address').should('be.visible').should('not.be.disabled').click();
        cy.wait(1500);

        const cssLocator='path[d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"]';

        cy.get(cssLocator).its('length').then(length => {
            cy.log(`Number of elements matching the CSS locator: ${length}`);
            if(length===3){
                cy.contains('Add Another Address').should('not.be.visible').should('be.disabled');
                cy.log('Already maximum limit of address is exceeded')
            }else{
                cy.contains('Add Another Address').should('be.visible').should('not.be.disabled').click();
                cy.wait(1500);
                cy.contains('Select From Existing Addresses').should('be.visible').should('not.be.disabled').click();
                cy.wait(1500);
                cy.contains('Save Address').should('be.visible').should('not.be.disabled');
                cy.wait(1500);
                cy.contains('Select From Existing Addresses').should('be.visible').should('not.be.disabled').click();
                cy.wait(1500);
                cy.contains('Add New').should('be.visible').should('not.be.disabled').click();
                cy.wait(1500);
                const adresslabel='select[class="chakra-select css-161pkch"]';
                cy.get(adresslabel).eq(0).then((dropdown)=>{
                    let previouslyselectedoption=dropdown.val();
                cy.get(adresslabel).eq(0).find('option').then((options)=>{
                    const actural=[...options].map(o=>o.value)
                for(let i=0;i<actural.length;i++){
                    cy.get(adresslabel).eq(0).select(actural[i]).should('have.value',actural[i]).should('not.be.disabled').should('be.visible');
                cy.wait(500);
                }
                })
                cy.get(adresslabel).eq(0).select(previouslyselectedoption);
                })
                cy.wait(1500);
                cy.get('input[placeholder="Flat No. / House No. / Building / Company / Apartment"]').should('be.visible').should('not.be.disabled');
                cy.wait(1500);
                cy.get('input[placeholder="Area, Street, Sector, Village"]').should('be.visible').should('not.be.disabled');
                cy.wait(1500);
                cy.get('input[placeholder="Landmark"]').should('be.visible').should('not.be.disabled');
                cy.wait(1500);
                cy.get('input[placeholder="Pincode"]').should('be.visible').should('not.be.disabled');
                cy.wait(1500);
                cy.get('input[placeholder="Town / City"]').should('be.visible').should('not.be.disabled');
                cy.wait(1500);
                cy.get('input[placeholder="State"]').should('be.visible').should('not.be.disabled');
                cy.wait(1500)
                const amb='select[class="chakra-select css-161pkch"]';
                cy.get(amb).eq(1).then((dropdown)=>{
                    let previouslyselectedoption=dropdown.val();
                cy.get(amb).eq(1).find('option').then((options)=>{
                    const actual=[...options].map(o=>o.value);
                    for(let i=0;i<actual.length;i++){
                        cy.get(amb).eq(1).select(actual[i]).should('have.value',actual[i]).should('be.visible').should('not.be.disabled');
                cy.wait(1500);
                    }
                })
                cy.get(amb).eq(1).select(previouslyselectedoption);
                })
                cy.wait(1500);
                let lift='select[class="chakra-select css-161pkch"]';
                cy.get(lift).eq(2).then((dropdown)=>{
                    const previouslyselectedoption=dropdown.val();
                cy.get(lift).eq(2).find('option').then((options)=>{
                    const actual=[...options].map(o=>o.value)
                for(let i=0;i<actual.length;i++){
                    cy.get(lift).eq(2).select(actual[i]).should('have.value',actual[i]).should('be.visible').should('not.be.disabled');
                    cy.wait(1500);
                }
                })
                cy.get(lift).eq(2).select(previouslyselectedoption);
                })
                cy.wait(1500);
                cy.contains('Locate On Map').should('be.visible').should('not.be.disabled');
                cy.wait(1500);
                cy.contains('Cancel').scrollIntoView().should('be.visible').should('not.be.disabled');
                cy.wait(1500);
                cy.get('button[class="chakra-modal__close-btn css-1ik4h6n"]').scrollIntoView().should('be.visible').should('not.be.disabled').click();


                


            }
        });
    })
})