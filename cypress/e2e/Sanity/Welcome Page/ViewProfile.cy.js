import url from '../../../fixtures/urls.json';
import un from '../../../fixtures/UN&PASS';

describe('View Profile',()=>{
    it('Checking Viw Profile',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];
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
        cy.contains('View Profile').eq(0).click();
        cy.wait(1500);
        cy.contains('Basic Info').eq(0).should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.contains('Address').eq(0).should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.contains('Emergency Contacts').eq(0).should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.contains('Medical Profile').eq(0).should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.contains('Insurance Info').eq(0).should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.contains('Preferred Hospital').eq(0).should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.contains('Click here for the QR code manual').should('exist').should('not.be.disabled');
        cy.wait(1500);
        cy.contains('Click here to download profile').should('exist').should('not.be.disabled');
        cy.wait(1500);
        cy.get('path[stroke-linejoin="round"]').eq(0).should('be.visible').scrollIntoView().should('not.be.disabled').click({force:true});
        cy.wait(1500);
        cy.contains('Save and continue').should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.contains('Profile Preview').click({force:true});
        cy.wait(1500);
        cy.get('div[class="ProfileAddressDetails_editIcon__GcAKc css-0"]').should('be.visible').scrollIntoView().should('not.be.disabled').click({force:true});
        cy.wait(1500);
        cy.contains('Profile Preview').should('be.visible').click();
        cy.wait(1500);
        cy.get('div[class="ProfileEmergencyContactDetails_editIcon__n0B5r css-0"]').should('be.visible').scrollIntoView().should('not.be.disabled').click();
        cy.wait(1500);
        cy.contains('Profile Preview').should('be.visible').click();
        cy.wait(1500);
        cy.get('div[class="ProfileMedicalDetails_editIcon__FV9pz css-0"]').should('be.visible').scrollIntoView().should('not.be.disabled').click();
        cy.wait(1500);
        cy.contains('Profile Preview').should('be.visible').click();
        cy.wait(1500);
        cy.get('div[class="ProfileInsurance_editIcon__4Mq82 css-0').should('be.visible').scrollIntoView().should('not.be.disabled').click();
        cy.wait(1500);
        cy.contains('Profile Preview').should('be.visible').click();
        cy.wait(1500);
        cy.get('div[class="ProfilePreferredHospital_editIcon__qIa1L css-0').should('be.visible').scrollIntoView().should('not.be.disabled').click();
        cy.wait(1500);
        cy.contains('Profile Preview').should('be.visible').click();
        cy.wait(1500);
        cy.get('div[class="ProfilePreferredHospital_editIcon__qIa1L css-0').should('be.visible').scrollIntoView().should('not.be.disabled').click();
        cy.wait(1500);
        cy.contains('Profile Preview').should('be.visible').click();
        cy.wait(1500);
        cy.contains('Click here for the QR code manual').click();
        cy.get('body').contains('Self').should('exist');
        // cy.url().should('include','.pdf');
        cy.wait(1500);
        // cy.go(-1);
        // cy.wait(1500);
        cy.get('button').contains('Click here to download profile').click({ force: true }); // Force click to bypass any potential issues

        // Wait for the download to complete
        cy.wait(5000); // Adjust this wait time according to the expected download time

        // Assert that the file exists in the download directory
        cy.readFile('Downloads').should('exist');


        
        

        





    })
})