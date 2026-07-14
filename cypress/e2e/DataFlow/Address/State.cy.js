import url from '../../../fixtures/urls.json';
import Elements from '../../../Objects/Elements';

describe('State', () => {
    it('State', () => {
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
        cy.contains('Address').click();
        cy.wait(1000);
        cy.contains('Add Another Address').then($button => {
            if ($button.prop('disabled')) {
                cy.log('Maximum limit is reached');
            } else {
                cy.contains('Add Another Address').click();
                cy.wait(1000);
                cy.contains('Add New').click();
                cy.wait(1000);
                cy.get('input[placeholder="State"]').scrollIntoView().type('Karntaka');
                cy.wait(1000);
                cy.get('input[placeholder="State"]').scrollIntoView().should('have.value', 'Karntaka');
                cy.wait(1000);
                cy.contains('Cancel').click();
            }
        })

    })
})