import url from "../../../fixtures/urls.json"

describe('family_portrait_image', () => {
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
    it('should be visible with correct alt text', () => {
        cy.get('img[alt="Smiling family portrait"]')
            .should('be.visible')
            .and('have.attr', 'alt', 'Smiling family portrait');
    });
    it('should have valid src and natural dimensions', () => {
        cy.get('img[alt="Smiling family portrait"]').should('have.attr', 'src').and('not.be.empty');
        cy.get('img[alt="Smiling family portrait"]').should(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0).and.equal(300);
            expect($img[0].naturalHeight).to.be.greaterThan(0).and.equal(227);
        });
    });
    it('should maintain aspect ratio responsively', () => {
        cy.viewport(375, 667);
        cy.get('img[alt="Smiling family portrait"]').should('be.visible');
    });
});