import url from "../../../fixtures/urls.json"

describe('IMAGE/ICON LINK ELEMENT', () => {
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
    it('Validates the Apple App Store Download Button', () => {
        cy.get('a[href*="apps.apple.com/in/app/poco-emurgency"]').as('appStoreBtn');
        cy.get('@appStoreBtn').find('img').as('appStoreImg');

        cy.get('@appStoreBtn').should('exist').and('be.visible');
        cy.get('@appStoreImg').should('be.visible');
        cy.get('@appStoreImg').should('have.attr', 'src').and('not.be.empty');
        cy.get('@appStoreImg').should('have.attr', 'alt');

        cy.get('@appStoreImg').invoke('outerWidth').should('be.closeTo', 68, 5)
        cy.get('@appStoreImg').invoke('outerHeight').should('be.closeTo', 23, 5)

        // Combine multiple CSS checks safely in one block
        cy.get('@appStoreImg').should(($img) => {
            expect($img).to.have.css('box-shadow');
            expect($img).to.have.css('border-style', 'none');
        });
    });
});