import url from "../../../fixtures/urls.json"

describe('register_button', () => {
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
    it('should exist and be visible', () => {
        cy.contains('button', 'Register').should('exist').and('be.visible');
    });

    it('should be enabled by default', () => {
        cy.contains('button', 'Register').should('not.be.disabled');
    });

    it('should have expected computed styles', () => {
        cy.contains('button', 'Register').then($btn => {
            const style = window.getComputedStyle($btn[0]);
            expect(style.backgroundColor).to.equal('rgb(1, 167, 181)');
            expect(style.color).to.equal('rgb(255, 255, 255)');
            expect(style.borderRadius).to.equal('8px');
            expect(style.fontWeight).to.equal('500');
            expect(style.cursor).to.equal('pointer');
        });
    });

    it('should respond to hover and focus states', () => {
        cy.contains('button', 'Register').trigger('mouseover');
        cy.contains('button', 'Register').focus().should('have.focus');
    });

    it('should trigger an action on click', () => {
        cy.contains('button', 'Register').click();
        // Assert resulting navigation/modal - adjust based on actual behavior
    });
});