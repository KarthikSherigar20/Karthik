import url from "../../../fixtures/urls.json"

describe('HEADINGS&TYPOGRAPHY', () => {
    beforeEach(() => {
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
    });
    // 3. HEADINGS & TYPOGRAPHY
    it('should assert heading hierarchy and text content', () => {
        cy.contains('Medical Emergency').should('be.visible');
        cy.contains('"Incident to Hospital Admission"').should('be.visible');
        cy.contains('Service Anywhere').should('be.visible');
        cy.contains(`“Peace of Mind for you and your family”`).should('be.visible');
    });
});