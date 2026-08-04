import url from "../../../fixtures/urls.json"

describe('notifications_region', () => {
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
    const positions = ['top', 'top-left', 'top-right', 'bottom-left', 'bottom', 'bottom-right'];

    positions.forEach((pos) => {
        it(`should have toast container present for position: ${pos}`, () => {
            cy.get(`#chakra-toast-manager-${pos}`)
                .should('exist')
                .and('have.attr', 'aria-live', 'polite');
        });
    });
});