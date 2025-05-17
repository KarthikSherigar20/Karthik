import login from "../../../support/login";

describe('Searchben-outputfields', () => {
    before(() => {
        login()
        cy.log('login completed')
    })

    it('Searchben-outputfields', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(1).click();

        cy.get('button[class="BenAddressData_button__0kXLn"]').eq(0).click();

        // Step 1: Expand all collapsible sections first
        // Step 1: Expand all collapsed sections first
        cy.get('div.react-checkbox-tree.rct-icons-fa4 .rct-node-collapsed > .rct-text > .rct-collapse')
            .each(($toggle) => {
                cy.wrap($toggle).click({ force: true });
            });

        // Step 2: Uncheck all checked checkboxes
        cy.get('div.react-checkbox-tree.rct-icons-fa4 input[type="checkbox"]:checked')
            .each(($checked) => {
                cy.wrap($checked).uncheck({ force: true });
            });

        // Step 3: Check each checkbox one by one (in order as they appear)
        cy.get('div.react-checkbox-tree.rct-icons-fa4 input[type="checkbox"]')
            .each(($cb, index) => {
                cy.wrap($cb).check({ force: true });
                cy.wait(300); // optional wait for UI update
            });



    })
})

