import url from "../../../fixtures/urls.json";

describe('Pococare Header Logo Assertions', () => {
    beforeEach(() => {
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
    });

    it('should assert logo presence, size, and position', () => {
        const logoSelector = 'img[alt="Company Logo"]';

        cy.get(logoSelector).first().as('mainLogo');

        // 1. Presence & visibility
        cy.get('@mainLogo').should('exist').and('be.visible');

        // 2. Size
        cy.get('@mainLogo').invoke('width').should('be.closeTo', 110.5, 2);
        cy.get('@mainLogo').invoke('height').then((h) => {
            cy.log(`Actual logo height: ${h}px`); // capture real value first run
        });

        // 3. Position - using actual measured top value
        cy.get('@mainLogo').then(($logo) => {
            const rect = $logo[0].getBoundingClientRect();
            cy.log(`top: ${rect.top}, left: ${rect.left}`);
            expect(rect.top).to.be.closeTo(41.36, 5);
            expect(rect.left).to.be.closeTo(41, 10); // update once you confirm actual left value
        });
    });
    //Pococare Logo Color Assertion via Canvass

    it('should assert logo presence, size, position, and brand color', () => {
        const logoSelector = 'img[alt="Company Logo"]';

        cy.get(logoSelector)
            .first()
            .as('mainLogo')
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0);
            });

        // 1. Natural image dimensions (intrinsic size)
        cy.get('@mainLogo').should(($img) => {
            expect($img[0].naturalWidth).to.eq(234);
            expect($img[0].naturalHeight).to.eq(94);
        });

        // 2. Rendered size and position on screen
        cy.get('@mainLogo').then(($logo) => {
            const rect = $logo[0].getBoundingClientRect();
            cy.log(`Rendered size: ${rect.width}x${rect.height}, position: top=${rect.top}, left=${rect.left}`);
            expect(rect.width).to.be.closeTo(110.5, 2);
            expect(rect.height).to.be.greaterThan(0);
            expect(rect.top).to.be.closeTo(41.36, 5);
        });

        // 3. Brand color assertion via canvas pixel sampling
        cy.get('@mainLogo').then(($img) => {
            const imgEl = $img[0];
            const canvas = document.createElement('canvas');
            canvas.width = imgEl.naturalWidth;
            canvas.height = imgEl.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(imgEl, 0, 0);

            // Confirmed brand pink at center point of the "care" text
            const pinkPixel = ctx.getImageData(117, 47, 1, 1).data;
            expect(pinkPixel[0]).to.be.closeTo(255, 5); // R
            expect(pinkPixel[1]).to.be.closeTo(41, 10); // G
            expect(pinkPixel[2]).to.be.closeTo(151, 10); // B
            expect(pinkPixel[3]).to.eq(255); // fully opaque

            // Background/corner should be white
            const bgPixel = ctx.getImageData(5, 5, 1, 1).data;
            expect(bgPixel[0]).to.eq(255);
            expect(bgPixel[1]).to.eq(255);
            expect(bgPixel[2]).to.eq(255);
        });
    });
});