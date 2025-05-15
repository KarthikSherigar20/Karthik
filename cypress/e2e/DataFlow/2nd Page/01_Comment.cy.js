import login, { isWorkInProgress } from "../../../support/login";

describe('Comment', () => {
    before(() => {
        cy.wrap((null)).then(() => {
            login()
        }).then(() => {
            cy.log('Login completed')
        })
    })
    it('Comment', () => {
        cy.get('body').then(($bodyText) => {
            const bodyText = $bodyText.text();
            if (bodyText.includes('New')) {
                cy.contains('New').click();
                cy.wait(1500);
                cy.get('input[class="radioButton_radio__Dmg-B"]').eq(3).scrollIntoView().click();
                cy.wait(1500);
                cy.get('input[class="radioButton_radio__Dmg-B"]').eq(7).scrollIntoView().click();
                cy.wait(1500);
                cy.get('input[name="isAmbulanceRequired"]').eq(1).click();
                cy.wait(1500);
                cy.contains('Save Assessment').scrollIntoView().click();
                cy.wait(1500);
                cy.get('input[type="radio"]').eq(0).click();
                cy.wait(1500);
                cy.get('input[type="radio"]').eq(0).click();
                cy.wait(1500);
                cy.contains('Start Emergency').click();
                // Get the current date and format it
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().split('T')[0] + ' ' + currentDate.toTimeString().split(':')[0]; // 'YYYY-MM-DD HH'
                cy.wait(1500);
                cy.contains('Comment').click();
                cy.wait(1500);
                cy.get('p[class="text agentNotes_agentNotes__XKhpk"]').eq(1).invoke('text').then((text) => {
                    const partialText = `Emergency Started,${formattedDate}`;
                    expect(text).to.include(partialText);
                })
                cy.get('.ant-modal-close-x').click();
                cy.wait(1500);
                cy.contains('Emergency Resolved').click();

            }
        })
    })
})