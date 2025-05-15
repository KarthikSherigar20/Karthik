import login3 from "../../../support/login3-cqr"

describe('CQR-Test demo', () => {
    let storedText

    before(() => {
        cy.wrap(null).then(() => {
            login3();
        }).then(() => {
            cy.log('Login completed')
        })
    })
    it('E2E for Test demo', () => {
        cy.get('body').then(($bodyText) => {
            const bodyText = $bodyText.text();
            if (bodyText.includes('New')) {

                cy.wait(1500);
                cy.contains('New').prevAll().eq(2).invoke('text').then((text) => {
                    storedText = text;
                    cy.contains('New').click();
                    cy.wait(2000);
                    cy.get('input[value="no"]').scrollIntoView().click();
                    cy.wait(2000);
                    cy.get('body').then(($bodyText) => {
                        const bodyText = $bodyText.text();
                        expect(bodyText).to.include('General Enquiry');
                        cy.wait(2000);
                        expect(bodyText).to.include('TestDemo');
                    })
                    cy.contains('TestDemo').scrollIntoView().click();
                    cy.wait(2000);
                    cy.contains(storedText).nextAll().eq(2).should('have.text', 'TestDemo');
                })
            }
        })
    })
})