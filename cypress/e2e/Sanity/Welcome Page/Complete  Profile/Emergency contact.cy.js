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
                click();
            }else{
            cy.contains('Complete Profile').eq(0).click();
            }
        })
        cy.contains('Emergency Contact').click();
        cy.wait(1500);
        const cssLocator="path[d='M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z']";
        cy.get(cssLocator).its('length').then(length=>{
            if(length===3){
            cy.contains('Add Another Contact').should('not.be.visible').should('be.disabled');    
            cy.log('Already maximum limit of Emergency contact is exceeded')
            }else{
            cy.contains('Add Another Contact').should('be.visible').should('not.be.disabled').click();
            cy.wait(1500);
            cy.get('body').contains('Add New Contact').should('exist');
            cy.wait(1500);
            const CEC='select[class="chakra-select css-161pkch"]';
            cy.get(CEC).eq(0).then((dropdown)=>{
                const previouslySelectedOption=dropdown.val();
            cy.get(CEC).eq(0).find('option').then((options)=>{
                const actual=[...options].map(o=>o.value)
            for(let i=0;i<actual.length;i++){
                cy.get(CEC).eq(0).select(actual[i]).should('have.value',actual[i]).should('be.visible').should('not.be.disabled');
                cy.wait(500);
            }
            })
            cy.get(CEC).eq(0).select(previouslySelectedOption).should('have.value',previouslySelectedOption);
            })
            cy.wait(1500);
            cy.get('input[placeholder="Full Name"]').should('be.visible').should('not.be.disabled');
            cy.wait(1500);

            cy.get(CEC).eq(1).then((dropdown)=>{
                const previouslySelectedOption=dropdown.val();
            cy.get(CEC).eq(1).find('option').then((options)=>{
                let actual=[...options].map(o=>o.value)
                for(let i=0;i<actual.length;i++){
                    cy.get(CEC).eq(1).select(actual[i]).should('have.value',actual[i]).should('be.visible').should('not.be.disabled');
            cy.wait(500);
                }
            })
            cy.get(CEC).eq(1).select(previouslySelectedOption).should('have.value',previouslySelectedOption);
            })
            cy.wait(1500);
            cy.get('input[placeholder="Mobile Number"]').should('be.visible').should('not.be.disabled');
            cy.wait(1500);
            cy.get('div[class="selected-flag"]').eq(0).should('be.visible').should('not.be.disabled');
            cy.wait(1500);
            cy.get('span[class="chakra-switch__track css-p27qcy"]').eq(0).should('be.visible').should('not.be.disabled');
            cy.wait(1500);
            cy.get('input[placeholder="Whatsapp Number"]').should('be.visible').should('not.be.disabled');
            cy.wait(1500);
            cy.get('div[class="selected-flag"]').eq(1).should('be.visible').should('not.be.disabled');
            cy.wait(1500);
            cy.get('span[class="chakra-switch__track css-p27qcy"]').eq(1).should('be.visible').should('not.be.disabled');
            cy.wait(1500);
            cy.contains('Save').should('be.visible').should('not.be.disabled');
            cy.wait(1500);
            cy.contains('Cancel').should('be.visible').should('not.be.disabled');
            cy.wait(1500);
            cy.get('button[aria-label="Close"]').should('be.visible').should('not.be.disabled').click();

            cy.get('path[d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"]')
            .eq(0).should('be.visible').should('not.be.disabled').click({force:true});
            cy.wait(1500);
            cy.get('body').contains('Edit Contact').should('exist');
            cy.wait(1500);
            cy.get('input[placeholder="Full Name"]').should('be.visible').should('not.be.disabled');
            cy.wait(1500);

              // Assuming your dropdown selector
const dropdownSelector = 'select[class="chakra-select css-161pkch"]';
cy.get(dropdownSelector).then((dropdown)=>{
    const previouslySelectedOption=dropdown.val();
    cy.get(dropdownSelector).find('option').then((options)=>{
        const actual=[...options].map(o=>o.value)
        for(let i=0;i<actual.length;i++){
            cy.get(dropdownSelector).select(actual[i]).should('have.value',actual[i]).should('not.be.disabled');
            cy.wait(500);
        }
    })
    cy.get(dropdownSelector).select(previouslySelectedOption).should('have.value',previouslySelectedOption);
})

    

    // Select the previously selected option
cy.get('input[placeholder="Mobile Number"]').should('be.visible').should('not.be.disabled');
cy.wait(1000);
cy.get('span[class="chakra-switch__thumb css-7roig"]').eq(0).should('be.visible').should('not.be.disabled');
cy.wait(1000);
cy.get('span[class="chakra-switch__thumb css-7roig"]').eq(1).should('be.visible').should('not.be.disabled');
cy.wait(1000);
cy.contains('Save Changes').should('be.visible').should('not.be.disabled');
cy.wait(1000);
cy.contains('Cancel').should('be.visible').should('not.be.disabled');
cy.wait(1000);
cy.get('button[aria-label="Close"]').should('be.visible').should('not.be.disabled').click();
            }
        })
    })
})