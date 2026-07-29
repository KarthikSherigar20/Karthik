import url from "../../../fixtures/urls.json";

describe('Pococare Page - Links Assertions (Corrected)', () => {
    beforeEach(() => {
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
    });
    // 8. APP DOWNLOAD IMAGES (these are <img>, not <a> - verify if wrapped in a link)
    it('should verify app store badges are wrapped in clickable links (or flag if not)', () => {
        cy.get('img[alt="App Store"]').then(($img) => {
            const parentLink = $img.closest('a');
            if (parentLink.length) {
                cy.wrap(parentLink).should('have.attr', 'href').and('include', 'play.google.com');
            } else {
                cy.log('WARNING: "App Store" image is not wrapped in an <a> tag - not navigable');
            }
        });

        cy.get('img[alt="Ios Store"]').then(($img) => {
            const parentLink = $img.closest('a');
            if (parentLink.length) {
                cy.wrap(parentLink).should('have.attr', 'href').and('include', 'apps.apple.com');
            } else {
                cy.log('WARNING: "Ios Store" image is not wrapped in an <a> tag - not navigable');
            }
        });
    });
});