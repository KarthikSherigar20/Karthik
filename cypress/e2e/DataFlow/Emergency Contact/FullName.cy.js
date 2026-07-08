import url from '../../../fixtures/urls.json';
import un from '../../../fixtures/UN&PASS';
import Elements from '../../../Objects/Elements';

describe('FullName', () => {
    it('FullName', () => {
        const selectedEnvironments = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironments];
        cy.visit(selectUrl);
        const P1 = new Elements();
        // cy.wait(1500);
        // cy.contains('Login').click();
        cy.wait(1500);
        cy.get('input[placeholder="Email"]').type(un.Un);
        cy.wait(1500);
        cy.contains('Get OTP').click();
        cy.wait(3500);
        P1.PTA();
        cy.wait(1000);
        P1.OTP();
        cy.wait(1000);
        cy.contains('Verify').click();
        cy.wait(1500);
        cy.get('body').then(($bodyText) => {
            const bodyText = $bodyText.text();
            if (bodyText.includes('Edit Profile')) {
                cy.contains('Edit Profile').click();
            } else {
                cy.contains('Complete Profile').eq(0).click();
            }
        })
        cy.contains('Emergency Contact').click();
        cy.wait(1000);

        cy.contains('Add Another Contact').then(($btn) => {

            if ($btn.is(':disabled')) {

                P1.EmergencyNumbers();
                cy.wait(500);

                cy.get('svg[class="EmergencyContact_redIcon__xfuA3"]')
                    .eq(2)
                    .click();

                cy.wait(1000);
                cy.get(`button[class="chakra-button css-18zw69y"]`).click();
                cy.wait(1000);

                // cy.reload();

                cy.contains('Add Another Contact')
                    .should('not.be.disabled');

                cy.wait(500);


                cy.contains('Add Another Contact')
                    .click();

                cy.get('input[placeholder="Full Name"]')
                    .type('Abcde')
                    .should('have.value', 'Abcde');

                cy.contains('Cancel').click();
                cy.wait(500);

                cy.contains('Add Another Contact')
                    .click();
                cy.get('@EfullName').then((EfullName) => {
                    cy.log('Alias value = ' + EfullName);
                    console.log('Alias value = ', EfullName);
                    cy.get('input[placeholder="Full Name"]').clear().type(EfullName).should('have.value', EfullName);
                });
                cy.get('@Erelationship').then((Erelationship) => {
                    cy.get('select[class="chakra-select css-161pkch"]').select(Erelationship).should('have.value', Erelationship);
                });
                cy.get('@EphoneNumber').then((EphoneNumber) => {
                    cy.get('input[placeholder="Mobile Number"]').type(EphoneNumber).should('have.value', EphoneNumber);
                });

                cy.get('@EwhatsappNumber').then((whatsappNumber) => {

                    if (whatsappNumber === null) {
                        cy.log('Whatsapp field is not available');
                    } else {
                        cy.log('Whatsapp Number: ' + whatsappNumber);
                        cy.get('input[placeholder="Whatsapp Number"]').type(whatsappNumber).should('have.value', whatsappNumber);
                    }

                });
                cy.contains('Save').click();
                cy.wait(500);
                cy.contains('Add Another Contact').scrollIntoView().should('be.disabled');
            }
        });

        cy.contains('Add Another Contact')
            .click();

        cy.get('input[placeholder="Full Name"]')
            .type('Abcde')
            .should('have.value', 'Abcde');

        cy.contains('Cancel').click();

    })
})