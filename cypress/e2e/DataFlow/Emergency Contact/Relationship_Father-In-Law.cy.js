import url from '../../../fixtures/urls.json';
import Elements from '../../../Objects/Elements';

describe('Relationship_Father-In-Law', () => {
    it('Relationship_Father-In-Law', () => {
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
                P1.EmergencyNumbersStoring();
                cy.wait(500);
                cy.get('svg[class="EmergencyContact_redIcon__xfuA3"]')
                    .eq(2)
                    .click();
                cy.get('svg[class="EmergencyContact_redIcon__xfuA3"]')
                    .eq(2)
                    .click({force: true});
                cy.wait(1000);
                cy.get(`button[class="chakra-button css-18zw69y"]`).click();
                cy.wait(1000);
                cy.contains('Add Another Contact')
                    .should('not.be.disabled');
                cy.wait(500);
                cy.contains('Add Another Contact').click();
                cy.wait(1000);
                let relation = 'select[class="chakra-select css-161pkch"]';
                cy.get(relation).eq(1).select('Father-In-Law');
                cy.wait(1000);
                cy.get(relation).eq(1).should('have.value', 'Father-in-law');
                cy.wait(1000);
                cy.contains('Cancel').click();
                cy.wait(500);
                P1.EmergencyNumbersRetrieving();

            } else {
                cy.contains('Add Another Contact').click();
                cy.wait(1000);
                let relation = 'select[class="chakra-select css-161pkch"]';
                cy.get(relation).eq(1).select('Father-In-Law');
                cy.wait(1000);
                cy.get(relation).eq(1).should('have.value', 'Father-in-law');
                cy.wait(1000);
                cy.contains('Cancel').click();
            }
        });
    })
})