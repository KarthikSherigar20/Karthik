import url from "../../../fixtures/urls.json"

describe('App Store / Play Store Badges', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.contains('"Terms & Conditions"')
            .should('have.attr', 'href')
            .then((href) => {
                cy.visit(href)
            })
        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    it('should verify Play Store badge', () => {
        cy.get('a[href*="play.google.com"] img').should('be.visible')
            .and('have.attr', 'src')
            .then(src => expect(src).to.not.be.empty);
    });

    it('should verify App Store badge', () => {
        cy.get('a[href*="apps.apple.com"] img').should('be.visible')
            .and('have.attr', 'src')
            .then(src => expect(src).to.not.be.empty);
    });
});