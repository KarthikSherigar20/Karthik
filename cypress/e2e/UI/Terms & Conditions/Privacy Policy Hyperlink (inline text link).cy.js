import url from "../../../fixtures/urls.json"

describe('Privacy Policy Hyperlink (inline text link)', () => {
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
    it('should verify href attribute', () => {
        cy.get('a[href="https://www.pococare.com/privacypolicy"]').first()
            .should('be.visible')
            .and('have.attr', 'href', 'https://www.pococare.com/privacypolicy');
    });
    it('should verify href attribute', () => {
        cy.get('a[href="https://www.pococare.com/privacypolicy"]').first()
            .should('be.visible')
            .and('have.attr', 'href', 'https://www.pococare.com/privacypolicy');
    });

    it('should verify link color', () => {
        cy.get('a[href="https://www.pococare.com/privacypolicy"]').first()
            .should('have.css', 'color', 'rgb(0, 123, 255)');
    });

    it('should verify text-decoration is none by default', () => {
        cy.get('a[href="https://www.pococare.com/privacypolicy"]').first()
            .should('have.css', 'text-decoration-line', 'none');
    });
    it('should verify text-decoration-line is none (not underline)', () => {
        cy.get('a[href="https://www.pococare.com/privacypolicy"]').first()
            .should('have.css', 'text-decoration-line', 'none'); // ✅ corrected from 'underline'
    });
});