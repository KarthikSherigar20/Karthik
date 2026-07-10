import url from '../../../fixtures/urls.json';
import un from '../../../fixtures/UN&PASS';
import Elements from '../../../Objects/Elements';

describe('MobileNumber', () => {
    it('MobileNumber', () => {
        const selectedEnvironments = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironments];
        cy.visit(selectUrl);
        const P1 = new Elements();
        P1.login();
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
        let relation = 'input[placeholder="Mobile Number"]';
        cy.get(relation).type('9019803837')
        cy.wait(1000);
        cy.get(relation).should('have.value', '90198-03837');
        cy.wait(1000);
        cy.get('input[placeholder="Whatsapp Number"]').should('be.visible');
        cy.wait(1000);
        cy.get('span[class="chakra-switch__track css-p27qcy"]').eq(0).click();
        cy.wait(1000);
        cy.get('input.chakra-switch__input').eq(0).should('be.checked');
        cy.wait(1000);
        cy.get('input[placeholder="Whatsapp Number"]').should('not.exist');
        cy.wait(1000);
        cy.contains('Cancel').click();

    })

})