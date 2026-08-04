import url from "../../../fixtures/urls.json"

describe('MISSION PARAGRAPH 1', () => {
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
    // 8. MISSION PARAGRAPH 1
    it('TC08 - Mission paragraph #1 content', () => {
        cy.contains('p, div', 'lack of coordination between patients, doctors')
            .should('be.visible');
    });
});