import url from "../../../fixtures/urls.json"

describe('"Our Founders" HEADING', () => {
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
    // 10. "Our Founders" HEADING
    it('TC10 - "Our Founders" section heading', () => {
        cy.get('.elementor-heading-title, [class*="heading"]')
            .contains('Founders')
            .filter(':visible')
            .should('be.visible')
            .and('contain.text', 'Our')
            .and('contain.text', 'Founders');
    });
});