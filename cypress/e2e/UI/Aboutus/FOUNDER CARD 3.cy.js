import url from "../../../fixtures/urls.json"

describe('FOUNDER CARD 3', () => {
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
    // 18. FOUNDER CARD 3 - Name "Mathalai Rajan"
    it('TC18 - Founder card 3 name "Mathalai Rajan"', () => {
        cy.contains('h3, h4, h5', 'Mathalai Rajan').should('be.visible');
    });
    // 19. FOUNDER CARD 3 - Title
    it('TC19 - Founder card 3 role label "Co-founder - Technology Head"', () => {
        cy.contains('Co-founder - Technology Head').should('be.visible');
    });
    // 20. FOUNDER CARD 3 - Bio
    it('TC20 - Founder card 3 bio paragraph', () => {
        cy.contains('Tech Mahindra, HP, and DXC').should('be.visible');
    });
    it('TC19b - Founder Card 3 (Mathalai Rajan) image visibility', () => {
        cy.contains('Mathalai Rajan').then($name => {
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
            expect(rect.width).to.be.greaterThan(0).and.closeTo(287, 5);
            expect(rect.height).to.be.greaterThan(0).and.closeTo(287, 5);
        });
    });
});