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
            const bodyText=$bodyText.text()
        })
        cy.contains('Complete Profile').eq(0).click();
        cy.wait(1500);
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
            cy.get('select[class="chakra-select css-161pkch"]').eq(0).should('be.visible').should('not.be.disabled');
            cy.wait(1500);
            cy.get('input[placeholder="Full Name"]').should('be.visible').should('not.be.disabled');
            cy.wait(1500);
            cy.get('select[class="chakra-select css-161pkch"]').eq(1).should('be.visible').should('not.be.disabled');
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
const dropdownSelector = 'div[class="chakra-select__wrapper css-1os4oeg"]';

cy.get(dropdownSelector).then(dropdown => {
    // Get the previously selected option
    const previouslySelectedOption = dropdown.val();
    
    // Fetch all the options within the dropdown
    const options = dropdown.find('option');
    cy.log('options',options);
    
    // Iterate through each option
    options.each((index, option) => {
        // Check if the option is disabled
        const isDisabled = Cypress.$(option).prop('disabled');
        
        if (!isDisabled) {
            // Click on the option
            cy.wrap(option).click({force:true}).then(() => {
                // Do any action you want after clicking the option
                cy.wait(1000);

                cy.get(dropdownSelector).should('have.value', Cypress.$(option).val());
                
                // Log to confirm
                cy.log(`Option ${index + 1} is clickable and not disabled.`);
            });
        } else {
            cy.log(`Option ${index + 1} is disabled.`);
        }
    });

    // Select the previously selected option
    cy.get(dropdownSelector).select(previouslySelectedOption).then(() => {
        // Do any action you want after selecting the previously selected option
        cy.log(`Previously selected option '${previouslySelectedOption}' is selected again.`);
    });
});
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
cy.contains('button[aria-label="Close"]').should('be.visible').should('not.be.disabled');
            }
        })
    })
})