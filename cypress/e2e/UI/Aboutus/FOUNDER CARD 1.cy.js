import url from "../../../fixtures/urls.json"

describe('FOUNDER CARD 1', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.wait(1000);
        cy.get('body').then(($bodyText) => {
            const bodyText = $bodyText.text();
            if (bodyText.includes('About Us')) {
                cy.contains('About Us').click();
            } else {
                cy.get(`button[class="chakra-button css-1qzx6lw"]`).click();
                cy.contains('About Us').click();
            }
        })
        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    // 11. FOUNDER CARD 1 - Name
    it('TC11 - Founder card 1 name "Raman Rangarajan Iyengar (Ranga)"', () => {
        cy.contains('h3, h4, h5', 'Raman Rangarajan Iyengar').should('be.visible')
            .and('contain.text', 'Ranga');
    });
    // 12. FOUNDER CARD 1 - Title/Role
    it('TC12 - Founder card 1 role label "Founder"', () => {
        cy.contains('Founder').filter(':visible').first().should('be.visible');
    });
    // 13. FOUNDER CARD 1 - Bio text
    it('TC13 - Founder card 1 bio paragraph', () => {
        cy.contains('p, div', 'IIT Kharagpur (Class of 1996) and IIM Lucknow').should('be.visible');
    });
    // 14. FOUNDER CARD 1 - Image
    it('TC14 - Founder card 1 profile image', () => {
        cy.contains('Raman Rangarajan Iyengar').parents().find('img').first().as('img1');
        cy.get('@img1').should('be.visible')
            .and('have.attr', 'src')
            .and('not.be.empty');
        cy.get('@img1').should('have.attr', 'alt');
        cy.get('@img1').then($img => {
            expect($img[0].naturalWidth).to.be.greaterThan(0).and.equal(234);
            expect($img[0].naturalHeight).to.be.greaterThan(0).and.equal(94);
        });
    });
});