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
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
        if(bodyText.includes('Add Emergency Contact')){
            cy.contains('Add Emergency Contact').should('be.visible').scrollIntoView().should('not.be.disabled').click();
        }else{
            cy.get('div[class="ProfileEmergencyContactDetails_editIcon__n0B5r css-0"]').should('be.visible').scrollIntoView().should('not.be.disabled').click();
            cy.wait(1500);
        }
        cy.contains('Profile Preview').should('be.visible').click();
        cy.wait(1500);
        if(bodyText.includes('Add Medical Info')){
            cy.contains('Add Medical Info').should('be.visible').scrollIntoView().should('not.be.disabled').click();
        }else{
            cy.get('div[class="ProfileMedicalDetails_editIcon__FV9pz css-0"]').should('be.visible').scrollIntoView().should('not.be.disabled').click();
        }
        cy.wait(1500);
        cy.contains('Profile Preview').should('be.visible').click();
        cy.wait(1500);
        if(bodyText.includes('Add InsuranceInfo')){
            cy.contains('Add InsuranceInfo').should('be.visible').scrollIntoView().should('not.be.disabled').click();
        }else{
            cy.get('div[class="ProfileInsurance_editIcon__4Mq82 css-0').should('be.visible').scrollIntoView().should('not.be.disabled').click();
        }
        cy.wait(1500);
        cy.contains('Profile Preview').should('be.visible').click();
        cy.wait(1000);
        if(bodyText.includes('Add Preferred Hospital')){
            cy.contains('Add Preferred Hospital').should('be.visible').scrollIntoView().should('not.be.disabled').click();
        }else{
            cy.wait(1500);
            cy.get('div[class="ProfilePreferredHospital_editIcon__qIa1L css-0').should('be.visible').scrollIntoView().should('not.be.disabled').click();
        }
        cy.wait(1500);
        cy.contains('Profile Preview').should('be.visible').click();
        cy.wait(1500);
        cy.contains('Click here for the QR code manual').click();
        cy.get('body').contains('Self').should('exist');
        // cy.url().should('include','.pdf');
        cy.wait(1500);
    })
    })
})