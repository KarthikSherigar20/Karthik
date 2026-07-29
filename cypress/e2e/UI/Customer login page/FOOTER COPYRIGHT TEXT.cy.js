import url from "../../../fixtures/urls.json"

describe('FOOTER COPYRIGHT TEXT', () => {
    beforeEach(() => {
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
    });
    // 9. FOOTER COPYRIGHT TEXT
    it('should assert footer copyright text is present and correct', () => {
        cy.contains('© 2025 Copyright POCOCARE. All Rights Reserved').should('be.visible');
    });
});