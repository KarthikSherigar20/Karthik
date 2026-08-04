import url from "../../../fixtures/urls.json"

describe('Apple App Store Badge', () => {
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
    // TC27 - Apple App Store Badge
    it('TC27 - Apple App Store badge: visibility, link, image', () => {
        cy.get('a[href*="apps.apple.com"]')
            .as('appleBadge')
            .should('exist')
            .and('be.visible');

        cy.get('@appleBadge')
            .should('have.attr', 'href')
            .and('include', 'apps.apple.com/in/app/poco-emurgency');

        cy.get('@appleBadge').then($el => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.width).to.be.greaterThan(0).and.closeTo(68, 5);
            expect(rect.height).to.be.greaterThan(0).and.closeTo(24, 5);
            const style = window.getComputedStyle($el[0]);
            expect(style.display).to.not.eq('none');
            expect(style.opacity).to.not.eq('0');
        });

        cy.get('@appleBadge').find('img').then($imgs => {
            if ($imgs.length) {
                cy.wrap($imgs.first())
                    .should('have.attr', 'src')
                    .and('not.be.empty');
                cy.wrap($imgs.first()).should('have.attr', 'alt');
            }
        });

        cy.get('@appleBadge').trigger('mouseover');
    });
});