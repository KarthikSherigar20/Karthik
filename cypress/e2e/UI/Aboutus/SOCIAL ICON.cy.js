import url from "../../../fixtures/urls.json"

describe('SOCIAL ICON', () => {
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
    // 21. SOCIAL ICON - Facebook
    it('TC21 - Facebook social icon link', () => {
        cy.contains('li, a', 'Facebook').should('be.visible');
    });
    // 22. SOCIAL ICON - Twitter
    it('TC22 - Twitter social icon link', () => {
        cy.contains('li, a', 'Twitter').should('be.visible');
    });

    // 23. SOCIAL ICON - Instagram
    it('TC23 - Instagram social icon link', () => {
        cy.contains('li, a', 'Instagram').should('be.visible');
    });

    // 24. SOCIAL ICON - LinkedIn
    it('TC24 - LinkedIn social icon link', () => {
        cy.contains('li, a', 'Linkedin').should('be.visible');
    });
});