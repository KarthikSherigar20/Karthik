import url from "../../../fixtures/urls.json"
// cypress/e2e/pococare_buttons.cy.js

describe('Pococare Homepage - Button Assertions', () => {

    beforeEach(() => {
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
    });

    // ---------------------------------------------------------
    // LOGIN BUTTON (actually a <div> popover trigger, not <button>)
    // ---------------------------------------------------------
    context('Login Button', () => {

        it('should be present and visible', () => {
            cy.contains('Login').should('exist').and('be.visible');
        });

        it('should have correct background color', () => {
            cy.contains('Login')
                .closest('[id^="popover-trigger"]')
                .should('be.visible')
                .and('have.css', 'background-color')
                .and('match', /rgb\(2\d{2},\s?\d{1,3},\s?1\d{2}\)/);
        });

        it('should have expected size (width/height)', () => {
            cy.contains('Login')
                .closest('[id^="popover-trigger"]')
                .then(($el) => {
                    const { width, height } = $el[0].getBoundingClientRect();
                    expect(width).to.be.greaterThan(80);
                    expect(height).to.be.greaterThan(30);
                });
        });

        it('should be positioned in the top-right nav area', () => {
            cy.contains('Login')
                .closest('[id^="popover-trigger"]')
                .then(($el) => {
                    const rect = $el[0].getBoundingClientRect();
                    expect(rect.top).to.be.lessThan(100);
                    expect(rect.left).to.be.greaterThan(700);
                });
        });

    });

    // ---------------------------------------------------------
    // GET OTP BUTTON (real <button> element)
    // ---------------------------------------------------------
    context('Get OTP Button - Position', () => {

        it('should be positioned below the phone number input', () => {
            cy.get('input[placeholder="Phone number"]').then(($input) => {
                const inputTop = $input[0].getBoundingClientRect().top;

                cy.contains('button', 'Get OTP').then(($btn) => {
                    const btnTop = $btn[0].getBoundingClientRect().top;
                    expect(btnTop).to.be.greaterThan(inputTop);
                });
            });
        });

        it('should be positioned below the email input', () => {
            cy.get('input[placeholder="Email"]').then(($input) => {
                const inputTop = $input[0].getBoundingClientRect().top;

                cy.contains('button', 'Get OTP').then(($btn) => {
                    const btnTop = $btn[0].getBoundingClientRect().top;
                    expect(btnTop).to.be.greaterThan(inputTop);
                });
            });
        });

        it('should be positioned in the lower half of the viewport', () => {
            cy.window().then((win) => {
                const viewportHeight = win.innerHeight;

                cy.contains('button', 'Get OTP').then(($btn) => {
                    const rect = $btn[0].getBoundingClientRect();
                    expect(rect.top).to.be.greaterThan(viewportHeight * 0.4);
                });
            });
        });

    });

    // ---------------------------------------------------------
    // GENERIC / ALL BUTTONS ON PAGE
    // ---------------------------------------------------------
    context('Generic reusable button assertions', () => {

        it('should verify all visible buttons have a valid bounding box', () => {
            cy.get('button').each(($btn) => {
                cy.wrap($btn).should('be.visible');
                cy.wrap($btn).then(($el) => {
                    const rect = $el[0].getBoundingClientRect();
                    expect(rect.width).to.be.greaterThan(0);
                    expect(rect.height).to.be.greaterThan(0);
                });
            });
        });

        it('should log background color of each button (informational only)', () => {
            cy.get('button').each(($btn, index) => {
                cy.wrap($btn).then(($el) => {
                    const bgColor = window.getComputedStyle($el[0]).backgroundColor;
                    cy.log(`Button ${index}: "${$el.text().trim()}" → background-color: ${bgColor}`);
                });
            });
        });

        it('should verify KNOWN primary CTA elements specifically have a filled background', () => {
            // Login is a div-based popover trigger; Get OTP is a real <button>
            cy.contains('Login')
                .closest('[id^="popover-trigger"]')
                .should('be.visible')
                .and('have.css', 'background-color')
                .and('not.eq', 'rgba(0, 0, 0, 0)');

            cy.contains('button', 'Get OTP')
                .should('be.visible')
                .and('have.css', 'background-color')
                .and('not.eq', 'rgba(0, 0, 0, 0)');
        });

    });

});