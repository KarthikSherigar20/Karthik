import url from "../../../fixtures/urls.json"

describe('INTRO PARAGRAPH', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.wait(1000);
        cy.get('body').then(($bodyText) => {
            const bodyText = $bodyText.text();
            if (bodyText.includes('About Us')) {
                cy.contains('About Us').click();
            } else {
                cy.get(`button[class="chakra-button css-1qzx6lw"]`).click();
                cy.contains('About Us').click();
            }
        })
        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    it('TC04 - Intro bold paragraph text and font-weight', () => {
        cy.contains('p, span, div', 'Pococare was founded by Raman Rangarajan Iyengar')
            .as('introText')
            .should('be.visible')
            .and('contain.text', 'IIT-KGP, IIM-L Alumni');
        cy.get('@introText').then($el => {
            const style = window.getComputedStyle($el[0]);
            expect(style.fontWeight).to.equal('300');
        });
    });
});