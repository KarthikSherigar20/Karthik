import login from "../../../support/login";

describe('Dashboard', () => {
    beforeEach(() => {
        cy.wrap(null).then(() => {
            login();
        }).then(() => {
            cy.log('Login completed')
        })
    })

    it('Ticket dashboard', () => {
        cy.contains('Ticket Dashboard Details').click();

        const expectedTexts = ['Company Name', 'Ticket Status', 'Count', 'Date Filter']

        cy.get('body').then(($bodyText) => {
            const bodyText = $bodyText.text();
            expectedTexts.forEach((text) => {
                expect(bodyText).to.contain(text);
            })
        })
    })

    it('Ben dashboard', () => {
        const dropdownValues = [];

        cy.contains('option', 'Select Company').should('be.visible').and('not.be.disabled').click({ force: true });

        cy.get('.CustomSelect_select_border__lWd7w')
            .find('option')
            .each(($ec) => {
                const text = $ec.text().trim(); // remove leading/trailing spaces
                if (text !== 'Select Company') {
                    dropdownValues.push(text);
                }
            })
            .then(() => {
                cy.log('Dropdown count (excluding "Select Company"): ' + dropdownValues.length);
                cy.log('Dropdown values: ' + JSON.stringify(dropdownValues));
            });


        const texts = ['totalSubscriber', 'totalBeneficiary', 'activatedBeneficiary', 'notActivatedBeneficiary', 'validNumber', 'notValidNumber',
            'qrDispatched', 'qrNotDispatched', 'S.No', 'relationship', 'totalUser', 'activatedUser', 'notActivatedUser', 'address', 'basicDetails',
            'emergencyContact', 'insurancePolicies', 'medicalInfo', 'preferredHospital', 'qrDispatched', 'qrNotDispatched', 'validNumber', 'notValidNumber'
        ]

        cy.get('body').then(($bodyText) => {
            const bodyText = $bodyText.text();

            texts.forEach((text) => {
                expect(bodyText, `${text} should be present on the page`).to.include(text);
            });
        })
    })
})