import url from "../../../fixtures/urls.json"

describe('FOUNDER CARD 2', () => {
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
    // 15. FOUNDER CARD 2 - Name "Amitav Ash"
    it('TC15 - Founder card 2 name "Amitav Ash"', () => {
        cy.contains('h3, h4, h5', 'Amitav Ash').should('be.visible');
    });
    // 16. FOUNDER CARD 2 - Title "Co-Founder & COO"
    it('TC16 - Founder card 2 role label', () => {
        cy.contains('Co-Founder & COO').should('be.visible');
    });
    // 17. FOUNDER CARD 2 - Bio
    it('TC17 - Founder card 2 bio paragraph', () => {
        cy.contains('WPP group agencies and Godfrey Phillips').should('be.visible');
    });
    // TC16b - Founder Card 2 (Amitav Ash) image
    it('TC16b - Founder Card 2 (Amitav Ash) image visibility', () => {
        cy.contains('Amitav Ash').then($name => {
            // Walk up through ancestors until one contains an image-like element
            let found = null;
            let $current = $name;
            for (let i = 0; i < 8 && !found; i++) {
                $current = $current.parent();
                const candidates = [...$current.find('img, div, span')].filter(el => {
                    const style = window.getComputedStyle(el);
                    return style.backgroundImage !== 'none' || el.tagName === 'IMG';
                });
                if (candidates.length) found = candidates[0];
            }
            expect(found, 'image element found within ancestor chain').to.exist;
            const rect = found.getBoundingClientRect();
            expect(rect.width).to.be.greaterThan(0).and.closeTo(287, 5)
            expect(rect.height).to.be.greaterThan(0).and.closeTo(287, 5)
        });
    });

});