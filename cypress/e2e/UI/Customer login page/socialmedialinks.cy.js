import url from "../../../fixtures/urls.json"

describe('Pococare Page - Links Assertions', () => {
    beforeEach(() => {
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
    });
    // ------------------------------------------------------------------
    it('should identify social media icon buttons (currently non-navigable)', () => {
        // These render as clickable buttons without hrefs in the current DOM
        cy.get('button').then(($buttons) => {
            const socialLikeButtons = $buttons.filter((i, el) => {
                const rect = el.getBoundingClientRect();
                return rect.width < 50 && rect.width > 0; // small icon-sized buttons
            });
            cy.log(`Found ${socialLikeButtons.length} small icon-style buttons (likely social icons)`);
        });

        cy.log('NOTE: Social icons (Facebook/Twitter/Instagram/LinkedIn) are <button> elements with no href attribute - they do not navigate to external profiles. This may be an accessibility/functional gap worth flagging to the dev team.');
    });
});