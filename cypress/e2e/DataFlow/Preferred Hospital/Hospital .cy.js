import url from '../../../fixtures/urls.json';
import Elements from '../../../Objects/Elements';

describe('Hospital ype', () => {
    it('Hospital ype', () => {
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
        cy.contains('Preferred Hospital').click();
        cy.wait(1000);
        cy.contains('Preferred Hospital').then($button => {
            if ($button.prop('disabled')) {
                cy.log('Maximum limit is reached');
            } else {
                cy.contains('Add Hospital').scrollIntoView().click();
                cy.wait(1000);
                cy.get('button[class="chakra-button css-1ycquqd"]').click();
                cy.wait(500);
                let Hospital = 'input[placeholder="Enter Hospital Name"]';
                cy.get(Hospital).type('Others');
                cy.wait(1000);
                cy.get(Hospital).should('have.value', 'Others');
                cy.wait(1000);
                cy.contains('Cancel').click();
            }
        })

    })
})