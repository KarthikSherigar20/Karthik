import url from "../../../fixtures/urls.json"

describe('Header Navigation and Logo.cy', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.contains('Contact Us').scrollIntoView().click();
        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    it('Verifies the Header Logo size, position, and visibility', () => {
        cy.get('a[href*="/home/"]')   // matches whether href is relative or absolute
            .should('be.visible')
            .and('have.css', 'display', 'inline-block')
            .invoke('outerWidth').should('be.greaterThan', 50);

        cy.get('a[href*="/home/"]').then(($logo) => {
            const rect = $logo[0].getBoundingClientRect();
            expect(rect.top).to.be.greaterThan(-1);
            expect(rect.left).to.be.greaterThan(-1);
        });
    });

    it('Verifies Navigation Menu Items colors and fonts', () => {
        cy.get('.hfe-nav-menu-icon, .elementor-menu-toggle')
            .should('be.visible')
            .click();

        const expectedStyles = {
            'About Us': { color: 'rgb(0, 0, 0)', fontSize: '18px', fontWeight: '400' },
            'Request a demo': { color: 'rgb(254, 29, 143)', fontSize: '18px', fontWeight: '400' },
            'Buy Subscription': { color: 'rgb(0, 0, 0)', fontSize: '18px', fontWeight: '400' },
            'Career': { color: 'rgb(0, 0, 0)', fontSize: '18px', fontWeight: '400' },
            'Blog': { color: 'rgb(0, 0, 0)', fontSize: '18px', fontWeight: '400' },
            'Login': { color: 'rgb(255, 255, 255)', fontSize: '18px', fontWeight: '400' },
        };

        Object.entries(expectedStyles).forEach(([item, styles]) => {
            cy.contains('a.hfe-menu-item, a', item)
                .should('be.visible')
                .and('have.css', 'color', styles.color)
                .and('have.css', 'font-size', styles.fontSize)
                .and('have.css', 'font-weight', styles.fontWeight);
        });
    });
});