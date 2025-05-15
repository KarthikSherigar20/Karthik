import login, { isWorkInProgress } from "../../../support/login";

describe('Assement results-POC.cy', () => {
    before(() => {
        cy.wrap((null)).then(() => {
            login()
        }).then(() => {
            cy.log('Login completed')
        })
    })
    it('Assement results-POC.cy', () => {
        cy.get('body').then(($bodyText) => {
            const bodyText = $bodyText.text();
            if (bodyText.includes('New')) {
                cy.contains('New').click();
                cy.wait(1500);
                cy.get('input[class="radioButton_radio__Dmg-B"]').eq(3).scrollIntoView().click();
                cy.wait(1500);
                cy.get('input[class="radioButton_radio__Dmg-B"]').eq(7).scrollIntoView().click();
                cy.wait(1500);
                cy.get('label[class="radioButton_label__jC0Qn"]').eq(7).invoke('text').then((Poc) => {

                    cy.log('Poc', Poc);
                    cy.wait(1500);
                    cy.contains('Save Assessment').scrollIntoView().click();
                    cy.wait(1500);
                    cy.get('input[type="radio"]').eq(0).click();
                    cy.wait(1500);
                    cy.get('input[type="radio"]').eq(0).click();
                    cy.wait(1500);
                    cy.contains('Start Emergency').click();
                    cy.wait(1500);
                    cy.get('img[class="icon undefined"]').eq(5).click();
                    cy.wait(1500);
                    cy.get('p[class="text ticketBasicDetails_value__wibkg"]').eq(0).invoke('text').then((text) => {
                        cy.log('text', text);
                        expect(text.trim().toLowerCase()).to.equal(Poc.toLowerCase());
                    })
                    cy.wait(1000);
                    cy.get('img[class="icon undefined"]').eq(5).click();
                    cy.wait(1000);
                    cy.contains('Emergency Resolved').scrollIntoView().click();
                    cy.wait(2000);
                })
            }
        })
    })
})