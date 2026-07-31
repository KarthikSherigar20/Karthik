import url from "../../../fixtures/urls.json"

describe('Form Dropdown, Textarea, and Submit Button', () => {
    beforeEach(() => {
        // Visit the target page before each test
        const selectedEnvironment = url.selectedEnvironment;
        const selectUrl = url.environments[selectedEnvironment];
        cy.visit(selectUrl);
        cy.contains('Contact Us').scrollIntoView().click();
        // Wait for the main form or body to load
        cy.get('body').should('be.visible');
    })
    // it('Fetch Subject Dropdown attributes', () => {
    //     cy.get('select')
    //         .should('be.visible')
    //         .then(($el) => {
    //             cy.log('Dropdown class:', $el.attr('class'));
    //             cy.log('Dropdown name:', $el.attr('name'));
    //             const s = window.getComputedStyle($el[0]);
    //             cy.log(`padding: ${s.padding}, border-radius: ${s.borderRadius}, color: ${s.color}, font-size: ${s.fontSize}`);
    //         });
    // });
    it('Verifies the Subject Dropdown properties (hardened)', () => {
        cy.get('select[name="subject"]')
            .should('be.visible')
            .and('have.class', 'wpcf7-validates-as-required')
            .and('have.class', 'form-style')
            .and('have.css', 'padding', '19px 0px')
            .and('have.css', 'border-radius', '0px')
            .and('have.css', 'color', 'rgb(117, 121, 126)')
            .and('have.css', 'font-size', '16px')
        // .and('have.value', 'Please select a subject');
        cy.get('select[name="subject"]')
            .should('be.visible')
            .and('have.value', '') // default placeholder has empty value attribute
            .find('option:selected')
            .should('have.text', 'Please select a subject');

        // Verify all dropdown options are present
        const expectedOptions = [
            'Please select a subject',
            'Requesting a demonstration',
            'Complaint about service',
            'Suggestions',
            'Enquiry for Subscription Purchase',
        ];

        cy.get('select[name="subject"] option').then(($options) => {
            const actualOptions = [...$options].map((o) => o.text);
            expect(actualOptions).to.deep.equal(expectedOptions);
        });
    });

    // it('Fetch Message textarea attributes', () => {
    //     cy.get('textarea')
    //         .should('be.visible')
    //         .then(($el) => {
    //             cy.log('Textarea class:', $el.attr('class'));
    //             cy.log('Textarea name:', $el.attr('name'));
    //             const s = window.getComputedStyle($el[0]);
    //             cy.log(`padding: ${s.padding}, border-radius: ${s.borderRadius}, color: ${s.color}, font-size: ${s.fontSize}, resize: ${s.resize}, min-height: ${s.minHeight}`);
    //         });
    // });

    it('Verifies the Message Textarea properties (hardened)', () => {
        cy.get('textarea[name="message"]')
            .should('be.visible')
            .and('have.class', 'wpcf7-textarea')
            .and('have.class', 'form-style')
            .and('have.css', 'padding', '19px 0px')
            .and('have.css', 'border-radius', '0px')
            .and('have.css', 'color', 'rgb(0, 0, 0)')
            .and('have.css', 'font-size', '16px')
            .and('have.css', 'resize', 'vertical');
    });
    // it('Fetch Submit button attributes', () => {
    //     cy.get('input[type="submit"], button[type="submit"]')
    //         .should('be.visible')
    //         .then(($el) => {
    //             cy.log('Submit tag:', $el[0].tagName);
    //             cy.log('Submit class:', $el.attr('class'));
    //             const s = window.getComputedStyle($el[0]);
    //             cy.log(`background-color: ${s.backgroundColor}, color: ${s.color}, cursor: ${s.cursor}, border-radius: ${s.borderRadius}, font-size: ${s.fontSize}`);
    //         });
    // });

    it('Verifies the Submit Button properties (hardened)', () => {
        cy.get('input[type="submit"]')
            .should('be.visible')
            .and('have.class', 'wpcf7-submit')
            .and('have.class', 'has-spinner')
            .and('have.css', 'background-color', 'rgb(254, 29, 143)')
            .and('have.css', 'color', 'rgb(255, 255, 255)')
            .and('have.css', 'cursor', 'pointer')
            .and('have.css', 'border-radius', '36px')
            .and('have.css', 'font-size', '18px')
            .and('have.attr', 'value', 'Submit'); // confirm button label/value
    });
});