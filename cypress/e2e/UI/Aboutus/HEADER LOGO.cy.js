import url from "../../../fixtures/urls.json"

describe('HEADER LOGO', () => {
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
    // 1. HEADER LOGO
    it('TC01 - Header Logo Link: visibility, attributes, position', () => {
        // Target the visible logo image link specifically, not hidden breadcrumb links
        cy.get('#masthead a')
            .filter(':visible')          // exclude any element hidden via CSS
            .first()
            .as('logo')
            .should('exist')
            .and('be.visible');

        cy.get('@logo').then($el => {
            const style = window.getComputedStyle($el[0]);
            expect(style.display).to.not.eq('none');
            expect(style.visibility).to.not.eq('hidden');
            expect(style.opacity).to.not.eq('0');
            const rect = $el[0].getBoundingClientRect();
            expect(rect.width).to.be.closeTo(200, 5);
            expect(rect.height).to.be.closeTo(80, 5)
        });

        cy.get('@logo')
            .invoke('attr', 'href')
            .should('match', /home/);

        cy.get('@logo').find('img, svg').should('exist');
    });
});