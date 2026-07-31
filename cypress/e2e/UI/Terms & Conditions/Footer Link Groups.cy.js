import url from "../../../fixtures/urls.json"

const footerLinks = {
    'About Us': ['Our Founders', 'Key Team Members'],
    'Useful Links': ['Contact Us', 'Terms and Conditions', 'Refund Policy', 'Privacy Policy'],
    'Pococare': ['Our Vision', 'Our Mission']
};

Object.entries(footerLinks).forEach(([group, links]) => {
    describe(`Footer Group: ${group}`, () => {
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
        links.forEach(link => {
            it(`should verify "${link}" link color, underline-on-hover, position`, () => {
                cy.contains('footer', link).should('be.visible')
                    .and('have.css', 'color');
            });
        });
    })
});