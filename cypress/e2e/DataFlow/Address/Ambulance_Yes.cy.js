import url from '../../../fixtures/urls.json';
import Elements from '../../../Objects/Elements';

describe('Ambulance_YES', () => {
    it('YES', () => {
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
                cy.get('select[class="chakra-select css-hsxcm3"]').eq(1).scrollIntoView().select('Yes, ambulance reachable');
                cy.wait(1000);
                cy.get('select[class="chakra-select css-hsxcm3"]').eq(1).scrollIntoView().should('have.value', 'Yes');
                cy.wait(1000);
                cy.contains('Cancel').click();
            }
        })

    })
})