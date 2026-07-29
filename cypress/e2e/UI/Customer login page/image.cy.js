import url from "../../../fixtures/urls.json"

describe('Pococare Page - All Images Assertions', () => {
    beforeEach(() => {
        // cy.viewport(1280, 800); // set explicit desktop viewport for consistency
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
    });

    // ------------------------------------------------------------------
    // 1. COMPANY LOGO - Size, Position, Color
    // ------------------------------------------------------------------
    it('should assert the company logo size, position, and brand color', () => {
        const logoSelector = 'img[alt="Company Logo"]';

        cy.get(logoSelector)
            .first()
            .as('mainLogo')
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0);
            });

        // Natural (intrinsic) image dimensions
        cy.get('@mainLogo').should(($img) => {
            expect($img[0].naturalWidth).to.eq(234);
            expect($img[0].naturalHeight).to.eq(94);
        });

        // Rendered size & screen position
        cy.get('@mainLogo').then(($logo) => {
            const rect = $logo[0].getBoundingClientRect();
            cy.log(`Logo rendered: ${rect.width.toFixed(1)}x${rect.height.toFixed(1)} at top=${rect.top.toFixed(1)}, left=${rect.left.toFixed(1)}`);
            expect(rect.width).to.be.closeTo(110.5, 2);
            expect(rect.height).to.be.greaterThan(0);
            expect(rect.top).to.be.closeTo(41.36, 5);
        });

        // Brand color check via canvas pixel sampling
        cy.get('@mainLogo').then(($img) => {
            const imgEl = $img[0];
            const canvas = document.createElement('canvas');
            canvas.width = imgEl.naturalWidth;
            canvas.height = imgEl.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(imgEl, 0, 0);

            // Confirmed brand pink at center of "care" text
            const pinkPixel = ctx.getImageData(117, 47, 1, 1).data;
            expect(pinkPixel[0]).to.be.closeTo(255, 5);
            expect(pinkPixel[1]).to.be.closeTo(41, 10);
            expect(pinkPixel[2]).to.be.closeTo(151, 10);
            expect(pinkPixel[3]).to.eq(255);

            // Corner should be white/transparent background
            const bgPixel = ctx.getImageData(5, 5, 1, 1).data;
            expect(bgPixel[0]).to.eq(255);
            expect(bgPixel[1]).to.eq(255);
            expect(bgPixel[2]).to.eq(255);
        });
    });

    // ------------------------------------------------------------------
    // 2. ALL <img> ELEMENTS - Existence & Load Validation
    // ------------------------------------------------------------------
    it('should assert every <img> element exists in DOM and loads correctly', () => {
        cy.get('img').should('have.length.greaterThan', 0);

        cy.get('img').each(($img, index) => {
            const el = $img[0];
            const alt = el.getAttribute('alt') || `(no alt) #${index}`;

            cy.wrap($img).should('exist');
            cy.wrap($img).should(($el) => {
                expect($el[0].naturalWidth, `${alt} - naturalWidth`).to.be.greaterThan(0);
            });
        });
    });

    // ------------------------------------------------------------------
    // 3. VISIBLE IMAGES ONLY - Size & Position (skips hidden/responsive ones)
    // ------------------------------------------------------------------
    it('should log and validate size/position of only visible images', () => {
        cy.get('img').then(($images) => {
            $images.each((index, el) => {
                const alt = el.getAttribute('alt') || `(no alt) #${index}`;
                const isVisible = !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);

                if (isVisible) {
                    const rect = el.getBoundingClientRect();
                    cy.log(`VISIBLE: "${alt}" -> ${rect.width.toFixed(1)}x${rect.height.toFixed(1)} at top=${rect.top.toFixed(1)}, left=${rect.left.toFixed(1)}`);
                    expect(rect.width, `${alt} width`).to.be.greaterThan(0);
                    expect(rect.height, `${alt} height`).to.be.greaterThan(0);
                } else {
                    cy.log(`HIDDEN (skipped): "${alt}"`);
                }
            });
        });
    });

    // ------------------------------------------------------------------
    // 4. KNOWN VISIBLE IMAGES - Explicit checks by alt text
    // ------------------------------------------------------------------
    it('should assert known always-visible images individually', () => {
        const expectedVisibleImages = ['Company Logo', 'emergency lifecycle'];

        expectedVisibleImages.forEach((alt) => {
            cy.get(`img[alt="${alt}"]`).should('exist').and('be.visible');
        });
    });

    // ------------------------------------------------------------------
    // 5. CONDITIONALLY HIDDEN IMAGES - App/iOS store badges
    // ------------------------------------------------------------------
    it('should assert conditional images exist but may be hidden depending on viewport', () => {
        const conditionalImages = ['App Store', 'Ios Store'];

        conditionalImages.forEach((alt) => {
            cy.get(`img[alt="${alt}"]`).should('exist').then(($img) => {
                const isVisible = $img.is(':visible');
                cy.log(`"${alt}" visible on this viewport: ${isVisible}`);
            });
        });
    });

    // ------------------------------------------------------------------
    // 6. COUNTRY FLAG DROPDOWN (not a plain <img>, it's a menu button)
    // ------------------------------------------------------------------
    it('should assert the country flag dropdown trigger is present and functional', () => {
        cy.get('[aria-haspopup="menu"]').first().as('flagButton');

        cy.get('@flagButton').should('exist').and('be.visible');

        // Verify whatever icon type is rendered inside (svg/img/span)
        cy.get('@flagButton').within(() => {
            cy.get('svg, img, span[role="img"]').should('exist');
        });

        // Size & position of the flag trigger
        cy.get('@flagButton').then(($el) => {
            const rect = $el[0].getBoundingClientRect();
            cy.log(`Flag button -> ${rect.width.toFixed(1)}x${rect.height.toFixed(1)} at top=${rect.top.toFixed(1)}, left=${rect.left.toFixed(1)}`);
            expect(rect.width).to.be.greaterThan(0);
            expect(rect.height).to.be.greaterThan(0);
        });
    });

    it('should open the country dropdown and verify default selection is India (+91)', () => {
        cy.get('[aria-haspopup="menu"]').first().click();

        cy.contains('IN').should('be.visible');
        cy.contains('+91').should('be.visible');

        cy.get('body').type('{esc}');
    });
});