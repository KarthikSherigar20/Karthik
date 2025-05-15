import Num from "../../../fixtures/Number.json";
import login4 from "../../../support/login4-icrn";

describe('IC-RN-Ambulance-No', () => {
    before(() => {
        cy.wrap((null)).then(() => {
            login4()
        }).then(() => {
            cy.log('Login completed')
        })
    })
    it('Ambulance-No', () => {
        cy.get('body').then(($bodyText) => {
            const bodyText = $bodyText.text();
            if (bodyText.includes('New')) {

                cy.contains('New').prevAll().eq(2).invoke('text').then((text) => {
                    const storedText = text;
                    cy.contains('New').click();
                    cy.wait(1500);
                    cy.get('input[class="radioButton_radio__Dmg-B"]').eq(3).scrollIntoView().click();
                    cy.wait(1500);
                    cy.get('input[class="radioButton_radio__Dmg-B"]').eq(8).scrollIntoView().click();
                    cy.wait(1500);
                    cy.get('input[name="isAmbulanceRequired"]').eq(1).click();
                    cy.wait(1500);
                    cy.contains('Save Assessment').scrollIntoView().click();
                    cy.wait(1500);
                    cy.get('input[type="radio"]').eq(0).click();
                    cy.wait(1500);
                    cy.get('input[type="radio"]').eq(1).click();
                    cy.wait(1500);
                    cy.contains('Start Emergency').click();
                    cy.wait(1000);
                    cy.get('body').should('contain', 'We will immediately dispatch an ambulance and set up a doctor’s consultation. Please stay available on Whatsapp for an online video consultation with the doctor. Thank you for reaching out to the Pococare Heartbeat team.');
                    cy.wait(1500);
                    cy.get('.doctorConsult_input__iF2im').eq(0).type(Num.Doc);
                    cy.wait(1500);
                    cy.get('.doctorConsult_input__iF2im').eq(1).type(Num.Pat);
                    cy.wait(1500);
                    cy.contains(' Send Meeting Link').click();
                    cy.wait(1500);
                    cy.on('window:alert', (alertmsg) => {
                        expect(alertmsg).to.equal('MeetingLink Sent Successfully');
                    })
                    cy.get('input[placeholder="Doctor Name"]').type(Num.DocName);
                    cy.wait(1500);
                    cy.get('input[placeholder="Doctor Number"]').type(Num.Doc);
                    cy.wait(1500);
                    cy.contains('Share Patient’s Profile').click();
                    cy.wait(1500);
                    cy.get('body').should('contain', 'Patient details shared to doctor');
                    cy.wait(1500);
                    cy.contains('Send Ambulance Message').click();
                    cy.wait(1500);
                    cy.get('body').should('contain', ' Ambulance Request Successfully Sent');
                    cy.wait(1500);
                    cy.contains('Ambulance Dispatched').scrollIntoView().click();
                    cy.wait(1500);
                    cy.get('body').should('contain', ' Success');
                    cy.wait(1500);
                    cy.contains('Pickup Location').click();
                    cy.wait(1500);
                    cy.get('body').should('contain', ' Success');
                    cy.wait(1500);
                    cy.contains('Pickup Patient').click();
                    cy.wait(1500);
                    cy.get('body').should('contain', ' Success');
                    cy.wait(1500);
                    cy.contains('Patient Dropped').click();
                    cy.wait(1500);
                    cy.get('body').should('contain', ' Success');
                    cy.wait(1500);
                    cy.contains('Emergency Resolved').click();
                    cy.wait(1500);
                    cy.contains(storedText).nextAll().eq(2).should('have.text', 'Completed');
                })
            }
        })
    })
})