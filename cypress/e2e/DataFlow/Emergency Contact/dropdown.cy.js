import url from '../../../fixtures/urls.json';
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
        cy.contains('Add Another Contact').then($button => {
            if ($button.prop('disabled')) {
                cy.log('Maximum limit is reached');
            } else {
                cy.contains('Add Another Contact').click();
                cy.wait(1000);
                // Log the number of options within the select element

                const drop = 'select[class="chakra-select css-161pkch"]';
                cy.get(drop).eq(0).find('option').then((options) => {
                    const optionCount = options.length;
                    cy.log('Number of options: ' + optionCount);

                    // Log each option text
                    options.each((index, option) => {
                        cy.log('Option ' + (index + 1) + ': ' + option.text);
                    });
                    for (let i = 1; i < optionCount; i++) {
                        cy.get(drop).eq(0).select(i);
                        cy.wait(1000);
                        cy.get('input[placeholder="Full Name"]').should('not.have.value', '');
                        cy.wait(1000);
                        cy.get('select[class="chakra-select css-161pkch"]').eq(1).should('not.have.value', '');
                        cy.wait(1000);
                        cy.get('input[placeholder="Mobile Number"]').should('not.have.value', '');

                    }
                });

                cy.contains('Cancel').click();
            }
        })

    })
})