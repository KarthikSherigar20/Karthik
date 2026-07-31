import url from "../../../fixtures/urls.json"

describe('Contact Information Text', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.contains('Contact Us').scrollIntoView().click();
        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    it('Verifies the Contact Information text styling and positioning (hardened)', () => {
        const expectedContactStyles = {
            'Bengaluru, India': { color: 'rgb(255, 255, 255)', fontSize: '18px', fontWeight: '500' },
            '+91 80560 66766': { color: 'rgb(255, 255, 255)', fontSize: '18px', fontWeight: '500' },
            'info@pococare.com': { color: 'rgb(255, 255, 255)', fontSize: '18px', fontWeight: '500' },
        };

        Object.entries(expectedContactStyles).forEach(([text, styles]) => {
            cy.contains('h4.elementor-heading-title.elementor-size-default', text)
                .should('be.visible')
                .and('have.css', 'color', styles.color)
                .and('have.css', 'font-size', styles.fontSize)
                .and('have.css', 'font-weight', styles.fontWeight);
        });
    });
    it('Verifies Contact Info items are horizontally aligned in the same row', () => {
        const items = ['Bengaluru, India', '+91 80560 66766', 'info@pococare.com'];
        const positions = [];

        items.forEach((text) => {
            cy.contains('h4.elementor-heading-title.elementor-size-default', text)
                .then(($el) => {
                    const rect = $el[0].getBoundingClientRect();
                    positions.push(rect.top);
                });
        });

        cy.then(() => {
            // All three should be roughly at the same vertical position (same row)
            const [top1, top2, top3] = positions;
            expect(Math.abs(top1 - top2)).to.be.lessThan(5);
            expect(Math.abs(top2 - top3)).to.be.lessThan(5);
        });
    });
});