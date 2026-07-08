import url from '../../../fixtures/urls.json';
import un from '../../../fixtures/UN&PASS';
import Elements from '../../../Objects/Elements';

describe('Relationship_Mother-In-Law', () => {
    it('Relationship_Mother-In-Law', () => {
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

                cy.get('svg[class="EmergencyContact_redIcon__xfuA3"]')
                    .eq(2)
                    .click();

                cy.wait(1000);
                cy.get(`button[class="chakra-button css-18zw69y"]`).click();
                cy.wait(1000);

                // cy.reload();

                cy.contains('Add Another Contact')
                    .should('not.be.disabled');
            }
        });
        cy.contains('Add Another Contact').click();
        cy.wait(1000);
        let relation = 'select[class="chakra-select css-161pkch"]';
        cy.get(relation).eq(1).select('Mother-In-Law');
        cy.wait(1000);
        cy.get(relation).eq(1).should('have.value', 'Mother-In-Law');
        cy.wait(1000);
        cy.contains('Cancel').click();

    })

})