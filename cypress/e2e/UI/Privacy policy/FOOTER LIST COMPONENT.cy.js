import url from "../../../fixtures/urls.json"

describe('FOOTER LIST COMPONENT', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.contains('"Privacy Policy"')
            .should('have.attr', 'href')
            .then((href) => {
                cy.visit(href);
            });
        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    it('Validates the Useful Links Footer Menu (using specific hrefs)', () => {
        const expectedLinks = [
            { text: 'Contact Us', href: '/contact-us/' },
            { text: 'Terms and Conditions', href: '/terms&conditions/' },
            { text: 'Refund Policy', href: '/Pococare_Refund_Policy.pdf' },
            { text: 'Privacy Policy', href: '/privacyPolicy/' }
        ];

        expectedLinks.forEach((link) => {
            cy.get(`a[href*="${link.href}"]`)
                .should('exist')
                .and('be.visible')
                .and('contain.text', link.text);
        });
    });
});