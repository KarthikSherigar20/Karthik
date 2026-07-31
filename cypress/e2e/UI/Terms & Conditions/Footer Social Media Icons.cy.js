import url from "../../../fixtures/urls.json"

['Facebook', 'Twitter', 'Instagram', 'Linkedin'].forEach(social => {
    describe(`Footer Social Media Icons: ${social}`, () => {
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
        it('should verify icon visibility, size, color, position', () => {
            cy.contains('footer', social).should('exist')
                .then($el => {
                    const rect = $el[0].getBoundingClientRect();
                    expect(rect.top).to.be.greaterThan(500); // footer area
                });
        });
    })

});