import login from "../../../support/login";

describe('comment', () => {
    before(() => {
        cy.wrap(null).then(() => {
            login();
        }).then(() => {
            cy.log('Login completed');
        });
    });

    it('comment', () => {
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
                cy.contains('Start Emergency').scrollIntoView().click();
                cy.wait(1500);
                cy.contains('Comment').click();
                cy.wait(1500);

                // Get the current date and format it
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().split('T')[0] + ' ' + currentDate.toTimeString().split(':')[0]; // 'YYYY-MM-DD HH'

                cy.get('[class="text agentNotes_agentNotes__XKhpk"]').invoke('text').then((text) => {
                    const partialText = `Assessment Details Updated,${formattedDate}`;
                    expect(text).to.include(partialText);
                });
                cy.get('.ant-modal-close-x').click();
                cy.wait(1500);
                cy.contains('Emergency Resolved').click();

            }
        })
    });
});
