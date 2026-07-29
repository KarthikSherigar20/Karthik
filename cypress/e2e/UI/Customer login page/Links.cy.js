import url from "../../../fixtures/urls.json";

describe('Pococare Page - Links Assertions', () => {
    beforeEach(() => {
        const selectedEnvironment=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironment];
        cy.visit(selectUrl);
    });

    // ------------------------------------------------------------------
    // 1. HEADER NAVIGATION LINKS
    // ------------------------------------------------------------------
    it('should assert header navigation links exist, are visible, and have valid hrefs', () => {
        const headerLinks = ['About Us', 'Request a demo', 'Buy Subscription', 'Career', 'Blog'];

        headerLinks.forEach((text) => {
            cy.contains('a', text)
                .should('exist')
                .and('be.visible')
                .and('have.attr', 'href')
                .and('not.be.empty');
        });
    });

    // ------------------------------------------------------------------
    // 2. TERMS & PRIVACY LINKS (inline, near signup form)
    // ------------------------------------------------------------------
    it('should assert inline Terms & Privacy links near the signup form', () => {
        cy.contains('a', 'Terms & Conditions').should('exist').and('be.visible').and('have.attr', 'href');
        cy.contains('a', 'Privacy Policy').should('exist').and('be.visible').and('have.attr', 'href');
    });

    // ------------------------------------------------------------------
    // 3. FOOTER LINKS
    // ------------------------------------------------------------------
    it('should assert footer links exist, are visible, and have valid hrefs', () => {
        const footerLinks = ['Contact Us', 'Terms & Conditions', 'Privacy Policy', 'Refund Policy'];

        footerLinks.forEach((text) => {
            cy.contains('footer a, a', text)
                .last() // in case both inline and footer versions match, target footer instance
                .should('exist')
                .and('be.visible')
                .and('have.attr', 'href')
                .and('not.be.empty');
        });
    });

    // ------------------------------------------------------------------
    // 4. CONTACT LINKS (phone / email) - verify correct protocol
    // ------------------------------------------------------------------
    it('should assert contact links use correct tel: and mailto: protocols', () => {
        cy.contains('a', '+91 8056066766')
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'href')
            .and('match', /^tel:/);

        cy.contains('a', 'info@pococare.com')
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'href')
            .and('match', /^mailto:/);
    });

    // ------------------------------------------------------------------
    // 5. ALL LINKS ON PAGE - Generic loop to check every <a> has a valid href
    // ------------------------------------------------------------------
    it('should assert every link on the page has a non-empty, valid href', () => {
        cy.get('a').should('have.length.greaterThan', 0);

        cy.get('a').each(($link) => {
            const href = $link.attr('href');
            const text = $link.text().trim() || '(no text)';

            // Skip links with no href (e.g., JS-only buttons styled as <a>)
            if (href === undefined) {
                cy.log(`SKIPPED (no href): "${text}"`);
                return;
            }

            expect(href, `href for "${text}"`).to.not.be.empty;
            cy.log(`Link "${text}" -> ${href}`);
        });
    });

    // ------------------------------------------------------------------
    // 6. VALIDATE LINKS DON'T RETURN BROKEN STATUS (404/500)
    // ------------------------------------------------------------------
    it('should assert internal links do not return broken HTTP status codes', () => {
        cy.get('a').then(($links) => {
            const hrefs = [...new Set(
                $links
                    .map((i, el) => Cypress.$(el).attr('href'))
                    .get()
                    .filter((href) => href && href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:'))
            )];

            hrefs.forEach((href) => {
                cy.request({ url: href, failOnStatusCode: false }).then((resp) => {
                    cy.log(`${href} -> status ${resp.status}`);
                    expect(resp.status, `Status for ${href}`).to.be.lessThan(400);
                });
            });
        });
    });

});