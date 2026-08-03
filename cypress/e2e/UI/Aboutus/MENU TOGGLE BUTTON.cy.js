import url from "../../../fixtures/urls.json"

describe('MENU TOGGLE BUTTON', () => {
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
    // 2. MENU TOGGLE BUTTON
    it('TC02 - Menu Toggle Button: visibility, hover/focus/active state', () => {
        cy.get('.header_menu.hfe-nav-menu__align-left')
            .as('menuWidget')
            .should('be.visible');

        // The real clickable toggle is usually a nested <span> or <div class="elementor-menu-toggle">
        cy.get('.elementor-menu-toggle, .hfe-nav-menu-icon, [class*="menu-toggle"]')
            .filter(':visible')
            .first()
            .as('menuBtn')
            .should('be.visible');

        cy.get('@menuBtn').then($el => {
            expect(['pointer', 'auto']).to.include(window.getComputedStyle($el[0]).cursor);
        });

        // Use trigger('focus') since this may not be a native focusable element
        cy.get('@menuBtn').trigger('focus');
        cy.get('@menuBtn').trigger('mouseover'); // hover state
        cy.get('@menuBtn').click(); // active/click state
    });
});