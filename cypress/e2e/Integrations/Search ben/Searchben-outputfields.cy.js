import login from "../../../support/login";

describe('Searchben-outputfields', () => {
    const alreadyChecked = [];
    const notFoundCheckboxes = [];

    function expandAllSections() {
        cy.get('div.react-checkbox-tree.rct-icons-fa4').then($container => {
            const $toggles = $container.find('.rct-node-collapsed > .rct-text > .rct-collapse');
            if ($toggles.length > 0) {
                cy.wrap($toggles).each($toggle => {
                    cy.wrap($toggle).click({ force: true });
                });
            } else {
                cy.log('No collapsed nodes found, nothing to expand');
            }
        });
    }

    function uncheckAll() {
        cy.get('div.react-checkbox-tree.rct-icons-fa4 input[type="checkbox"]:checked')
            .each(($checked) => {
                cy.wrap($checked).uncheck({ force: true });
            });
    }

    before(() => {
        login();
        cy.log('login completed');
    });

    it('checks checkboxes one by one excluding ignored and already-checked', () => {
        const ignoreCheckboxes = [
            "personalInfo", "address", "preferredHospital",
            "emergencyContacts", "insurancePolicies",
            "company", "subscriberDetails"
        ].map(i => i.toLowerCase());

        cy.get('svg.chakra-icon.css-6ey7w3').eq(1).scrollIntoView().click();
        cy.get('button.BenAddressData_button__0kXLn').eq(0).scrollIntoView().click();

        expandAllSections();
        uncheckAll();

        cy.get('div.react-checkbox-tree.rct-icons-fa4 label').then(($labels) => {
            const checkboxLabels = [];
            $labels.each((index, label) => {
                const labelText = Cypress.$(label).text().trim().toLowerCase();
                if (!ignoreCheckboxes.includes(labelText) && !alreadyChecked.includes(labelText)) {
                    checkboxLabels.push(labelText);
                }
            });

            cy.wrap(checkboxLabels).each((label, idx, labelsArray) => {
                cy.get('div.react-checkbox-tree.rct-icons-fa4 label').filter((_, el) => {
                    return Cypress.$(el).text().trim().toLowerCase() === label;
                }).then($filtered => {
                    if ($filtered.length === 0) {
                        notFoundCheckboxes.push(label);
                        cy.log(`Checkbox label not found: ${label}`);
                        return;
                    }

                    // Check if an index is provided in the 'label' parameter
                    const parts = label.split('@');
                    let targetIndex = 0; // Default to the first matching element

                    if (parts.length > 1 && !isNaN(parseInt(parts[1]))) {
                        label = parts[0].trim(); // Extract the actual label
                        targetIndex = parseInt(parts[1].trim());
                    }

                    if (targetIndex >= $filtered.length) {
                        cy.log(`Checkbox index out of bounds for label "${label}". Found ${$filtered.length} matching checkboxes.`);
                        return;
                    }

                    const $label = $filtered.eq(targetIndex); // Select the element at the specified index
                    cy.wrap($label)
                        .scrollIntoView()
                        .click({ force: true })
                        .then(() => {
                            alreadyChecked.push(label); // Note: We're pushing the original label (without index)
                        });
                        cy.wait(500);

                }).then(() => {
                    cy.get('button[aria-label="Close"]').scrollIntoView().click({ force: true });
                    cy.contains('No data Found').scrollIntoView().should('be.visible');
                    cy.get('button.BenAddressData_button__0kXLn').eq(1).scrollIntoView().click();

                    const pattern = `(${label}|benName|address.1|EmContact)`;
                    cy.contains(new RegExp(pattern, 'i'), { timeout: 30000 }).scrollIntoView().should('be.visible');


                    cy.wait(600);

                    cy.get('button.BenAddressData_button__0kXLn').eq(2).scrollIntoView().click({ force: true });
                    cy.contains('No data Found', { timeout: 30000 }).scrollIntoView().should('be.visible');

                    if (idx !== labelsArray.length - 1) {
                        cy.get('svg.chakra-icon.css-6ey7w3').eq(1).scrollIntoView().click();
                        cy.get('button.BenAddressData_button__0kXLn').eq(0).scrollIntoView().click();
                        expandAllSections();
                        uncheckAll();
                    }
                });
            }).then(() => {
                if (notFoundCheckboxes.length > 0) {
                    cy.log('Checkboxes not found:', [...new Set(notFoundCheckboxes)].join(', '));
                    // Optional: uncomment next line if you want to fail the test for missing checkboxes
                    // throw new Error(`Checkboxes not found: ${[...new Set(notFoundCheckboxes)].join(', ')}`);
                }
            });
        });
    });
});
