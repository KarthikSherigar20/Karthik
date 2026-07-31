import url from "../../../fixtures/urls.json"

describe('Sub-Headings', () => {
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
    const subHeadings = ['GENERAL', 'DEFINITION & INTERPRETATION', 'SERVICES',
        'USER REPRESENTATIONS AND WARRANTIES', 'THIRD PARTY SERVICES',
        'SUBSCRIPTION PLAN', 'SERVICE FEES', 'CONFIDENTIALITY', 'FORCE MAJEURE',
        'TERMINATION', 'INDEMNITY', 'LIMITATION OF LIABILITY AND DISCLAIMER',
        'MISCELLANEOUS'];

    subHeadings.forEach(heading => {
        describe(`Sub-heading: ${heading}`, () => {
            it('should verify visibility, color, font-size separately', () => {
                cy.contains(heading).should('be.visible');
                cy.contains(heading).should('have.css', 'color', 'rgb(0, 0, 0)');
                cy.contains(heading).should('have.css', 'font-size'); // just check it exists, no value comparison needed unless you specify one
            });
        });
    });
});