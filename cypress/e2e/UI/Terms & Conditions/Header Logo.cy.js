import url from "../../../fixtures/urls.json"

describe('Header Logo', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.contains('"Terms & Conditions"')
            .should('have.attr', 'href')
            .then((href) => {
                cy.visit(href);
            });
        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    it('Header Logo', () => {
        cy.get('a[href*="/home/"]').first()
            .should('be.visible')
            .then(($el) => {
                const r = $el[0].getBoundingClientRect();
                expect(r.top).to.be.closeTo(20, 15);
                expect(r.left).to.be.closeTo(20, 15);
                expect(r.width).to.be.greaterThan(100);
            });
    });
});