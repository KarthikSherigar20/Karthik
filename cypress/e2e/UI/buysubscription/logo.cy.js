import url from "../../../fixtures/urls.json"

describe('logo', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.wait(1000);
        cy.contains('Buy Subscription').scrollIntoView().click();
        cy.wait(500);
        cy.contains('Get Started').scrollIntoView().click();
        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    it('should be visible and present in DOM', () => {
        cy.get('img[alt="Company Logo"]').should('exist').and('be.visible');
    });
    it('should have correct src and alt', () => {
        cy.get('img[alt="Company Logo"]')
            .should('have.attr', 'src').and('not.be.empty');
        cy.get('img[alt="Company Logo"]').should('have.attr', 'alt', 'Company Logo');
    });
    it('should have natural dimensions > 0', () => {
        cy.get('img[alt="Company Logo"]').should(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0).and.equal(234);
            expect($img[0].naturalHeight).to.be.greaterThan(0).and.equal(94);
        });
    });
    it('should have expected position and size', () => {
        cy.get('img[alt="Company Logo"]').then($el => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.width).to.be.greaterThan(0).and.closeTo(145, 5);
            expect(rect.height).to.be.greaterThan(0).and.equal(24);
        });
    });
});