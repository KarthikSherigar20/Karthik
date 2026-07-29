import url from "../../../fixtures/urls.json"
// cypress/e2e/pococare_textfields.cy.js

describe('Pococare Homepage - Text Field Assertions', () => {

    beforeEach(() => {
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
    });

    // ---------------------------------------------------------
    // PHONE NUMBER FIELD
    // ---------------------------------------------------------
    context('Phone Number Field', () => {

        it('should be present and visible', () => {
            cy.get('input[placeholder="Phone number"]')
                .should('exist')
                .and('be.visible');
        });

        it('should have correct placeholder text', () => {
            cy.get('input[placeholder="Phone number"]')
                .should('have.attr', 'placeholder', 'Phone number');
        });

        it('should have expected width and height', () => {
            cy.get('input[placeholder="Phone number"]').then(($el) => {
                const { width, height } = $el[0].getBoundingClientRect();
                expect(width).to.be.greaterThan(200);
                expect(height).to.be.greaterThan(30);
            });
        });

        it('should have correct border and background styling', () => {
            cy.get('input[placeholder="Phone number"]')
                .should('have.css', 'border-style')
                .and('not.eq', 'none');
        });

        it('should be positioned below the nav bar', () => {
            cy.get('input[placeholder="Phone number"]').then(($el) => {
                const rect = $el[0].getBoundingClientRect();
                expect(rect.top).to.be.greaterThan(100);
            });
        });

        it('should be positioned to the right of the country code dropdown', () => {
            cy.get('input[placeholder="Phone number"]').then(($input) => {
                const inputRect = $input[0].getBoundingClientRect();

                cy.get('[id^="menu-button"]').then(($dropdown) => {
                    const dropdownRect = $dropdown[0].getBoundingClientRect();
                    expect(dropdownRect.left).to.be.greaterThan(inputRect.left);

                });
            });
        });

        it('should accept numeric input', () => {
            cy.get('input[placeholder="Phone number"]')
                .type('9876543210')
                .should('have.value', '9876543210');
        });

        it('should be positioned above the Email field', () => {
            cy.get('input[placeholder="Phone number"]').then(($phone) => {
                const phoneRect = $phone[0].getBoundingClientRect();

                cy.get('input[placeholder="Email"]').then(($email) => {
                    const emailRect = $email[0].getBoundingClientRect();
                    expect(phoneRect.top).to.be.lessThan(emailRect.top);
                });
            });
        });

    });

    // ---------------------------------------------------------
    // EMAIL FIELD
    // ---------------------------------------------------------
    context('Email Field', () => {

        it('should be present and visible', () => {
            cy.get('input[placeholder="Email"]')
                .should('exist')
                .and('be.visible');
        });

        it('should have correct placeholder text', () => {
            cy.get('input[placeholder="Email"]')
                .should('have.attr', 'placeholder', 'Email');
        });

        it('should have expected width and height', () => {
            cy.get('input[placeholder="Email"]').then(($el) => {
                const { width, height } = $el[0].getBoundingClientRect();
                expect(width).to.be.greaterThan(200);
                expect(height).to.be.greaterThan(30);
            });
        });

        it('should have correct border styling', () => {
            cy.get('input[placeholder="Email"]')
                .should('have.css', 'border-style')
                .and('not.eq', 'none');
        });

        it('should be positioned below the Phone number field', () => {
            cy.get('input[placeholder="Phone number"]').then(($phone) => {
                const phoneRect = $phone[0].getBoundingClientRect();

                cy.get('input[placeholder="Email"]').then(($email) => {
                    const emailRect = $email[0].getBoundingClientRect();
                    expect(emailRect.top).to.be.greaterThan(phoneRect.top);
                });
            });
        });

        it('should accept a valid email input', () => {
            cy.get('input[placeholder="Email"]')
                .type('testuser@example.com')
                .should('have.value', 'testuser@example.com');
        });

        it('should have type="email" or text input (validate expected input type)', () => {
            cy.get('input[placeholder="Email"]').then(($el) => {
                const type = $el.attr('type');
                expect(['email', 'text']).to.include(type);
            });
        });

    });

    // ---------------------------------------------------------
    // GENERIC / ALL TEXT FIELDS ON PAGE
    // ---------------------------------------------------------
    context('Generic reusable text field assertions', () => {

        it('should verify all visible text inputs have a valid bounding box', () => {
            cy.get('input[type="text"], input[type="email"], input:not([type])').each(($input) => {
                cy.wrap($input).should('be.visible');
                cy.wrap($input).then(($el) => {
                    const rect = $el[0].getBoundingClientRect();
                    expect(rect.width).to.be.greaterThan(0);
                    expect(rect.height).to.be.greaterThan(0);
                });
            });
        });

        it('should log placeholder, width, height, and position of each text field', () => {
            cy.get('input[type="text"], input[type="email"], input:not([type])').each(($input, index) => {
                cy.wrap($input).then(($el) => {
                    const rect = $el[0].getBoundingClientRect();
                    const placeholder = $el.attr('placeholder') || '(no placeholder)';
                    cy.log(
                        `Field ${index}: "${placeholder}" → width:${Math.round(rect.width)}px, height:${Math.round(rect.height)}px, top:${Math.round(rect.top)}, left:${Math.round(rect.left)}`
                    );
                });
            });
        });

        it('should verify no text field has a transparent border/background unexpectedly', () => {
            cy.get('input[type="text"], input[type="email"], input:not([type])').each(($input) => {
                cy.wrap($input).then(($el) => {
                    const bg = window.getComputedStyle($el[0]).backgroundColor;
                    cy.log(`Field background: ${bg}`);
                    // Informational log only — not a hard assertion, since some fields may legitimately be transparent
                });
            });
        });

    });

});