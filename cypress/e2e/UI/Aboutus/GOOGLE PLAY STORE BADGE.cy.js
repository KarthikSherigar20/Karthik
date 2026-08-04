import url from "../../../fixtures/urls.json"

describe('GOOGLE PLAY STORE BADGE', () => {
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
    // TC26 - Google Play Store Badge
    it('TC26 - Google Play Store badge: visibility, link, image', () => {
        cy.get('a[href*="play.google.com"]')
            .as('playBadge')
            .should('exist')
            .and('be.visible');

        cy.get('@playBadge')
            .should('have.attr', 'href')
            .and('include', 'play.google.com/store/apps/details');

        cy.get('@playBadge').then($el => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.width).to.be.greaterThan(0).and.closeTo(68, 5);
            expect(rect.height).to.be.greaterThan(0).and.closeTo(24, 5);
            const style = window.getComputedStyle($el[0]);
            expect(style.display).to.not.eq('none');
            expect(style.opacity).to.not.eq('0');
        });

        // Image or background-image check
        cy.get('@playBadge').find('img').then($imgs => {
            if ($imgs.length) {
                cy.wrap($imgs.first())
                    .should('have.attr', 'src')
                    .and('not.be.empty');
                cy.wrap($imgs.first()).should('have.attr', 'alt');
            }
        });

        // hover state
        cy.get('@playBadge').trigger('mouseover');
    });
});