import url from "../../../fixtures/urls.json"

describe('MAIN HEADING "About Pococare"', () => {
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
    it('TC03 - Main Heading text/styling', () => {
        cy.contains('h1, h2, [class*="heading"]', 'About').as('heading')
            .should('be.visible')
            .and('contain.text', 'About')
            .and('contain.text', 'Pococare');
        cy.get('@heading').then($el => {
            const style = window.getComputedStyle($el[0]);
            expect(style.fontFamily).to.be.a('string');
            expect(style.fontSize).to.match(/px/).and.equal('42px');
            expect(style.fontWeight).to.be.a('string').and.equal('300');
            expect(style.color).to.be.a('string');
        });
    });
});