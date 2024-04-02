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
        cy.contains('Edit Profile').click();
        cy.wait(1500);
        cy.contains('Basic Information').should('be.visible').should('not.be.disabled').click();
        cy.wait(1500);
        cy.get('select[class="chakra-select css-161pkch"]').eq(0).should('exist').should('be.disabled');
        cy.wait(1500);
        cy.get('input[placeholder="Full Name"]').should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.get('select[class="chakra-select css-161pkch"]').eq(1).should('be.visible').should('not.be.disabled');
        cy.wait(1500);

        let previouslyselctedoption;

        cy.get('select[class="chakra-select css-161pkch"]').eq(1).then(dropdown=>{
            previouslyselctedoption=dropdown.val();
            console.log('prev',previouslyselctedoption);
            const options=dropdown.find('option');
            console.log('option',options);
            options.each((index,option)=>{
                const isDisabled=Cypress.$(option).prop('disabled');

                cy.wrap(isDisabled).should('be.false');
                cy.wait(2000);
                cy.wrap(option).click({force: true});
            })
        }).then(()=>{
            cy.get('select[class="chakra-select css-161pkch"]').eq(1).select(previouslyselctedoption);
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