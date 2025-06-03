import login from '../../../support/login';

describe('QR-Test demo', () => {
    let storedText

    before(() => {
        cy.wrap(null).then(() => {
            login();
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
                    cy.contains('No').scrollIntoView().click();
                    cy.wait(2000);
                    cy.get('body').then(($bodyText) => {
                        const bodyText = $bodyText.text();
                        expect(bodyText).to.match(/General\s*Enquiry/i);
                        cy.wait(2000);
                        expect(bodyText).to.match(/Test\s*Demo/i);
                    })
                    cy.contains(/Test\s*Demo/).scrollIntoView().click();
                    cy.wait(2000);
                    cy.contains(storedText).nextAll().eq(2)
                        .invoke('text')
                        .should((text) => {
                            expect(text).to.match(/Test\s*Demo/);
                        })
                })
            }
        })
    })
})