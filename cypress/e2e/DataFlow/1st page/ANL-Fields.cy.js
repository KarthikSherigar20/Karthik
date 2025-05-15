import login from "../../../support/login";

describe('ANL-Fields', () => {
    before(() => {
        cy.wrap((null)).then(() => {
            login();
        }).then(() => {
            cy.log('Login completed')
        })
    })
    it('ANL-Fields', () => {
        cy.get('body').then(($bodyText) => {
            const bodyText = $bodyText.text();
            if (bodyText.includes('New')) {

                cy.wait(1500);
                cy.contains('New').click();
                cy.wait(1500);
                cy.contains('No').click();
                cy.wait(1500);
                cy.contains('General Enquiry').scrollIntoView().click();
                cy.wait(1500)
                cy.contains('Nearest Hospital').click();
                cy.wait(1500)
                cy.get('body').should('contain', 'Add New Location').should('be.visible')
                cy.wait(1500)
                cy.contains('Add New Location').scrollIntoView().click();
                cy.wait(1500)
                cy.get('body').should('contain', "Just to confirm, the patient is at <Summarize the address>, we will be dispatching the ambulance to this location.");
                cy.wait(2000)
                cy.get('input[placeholder="Enter Location"]').should('not.be.disabled').type('VR Chambers');
                cy.wait(2000)
                cy.get('input[placeholder="Flat No/Door No"]').click();
                cy.wait(2000)
                cy.get('input[placeholder="Enter Location"]').should('have.value', 'VR Chambers');
                cy.wait(2000)
                cy.get('input[placeholder="Flat No/Door No"]').should('not.be.disabled').type('23');
                cy.wait(2000)
                cy.get('input[placeholder="Flat No/Door No"]').should('have.value', '23');
                cy.wait(2000)
                cy.get('input[placeholder="Landmark (Optional)"]').should('not.be.disabled').type('23');
                cy.wait(2000)
                cy.get('input[placeholder="Landmark (Optional)"]').should('have.value', '23');
                cy.wait(2000)
                cy.get('span[class="ant-select-selection-search"]').eq(0).scrollIntoView().click({ force: true });
                cy.wait(2000)
                cy.get('div[class="ant-select-item-option-content"]').eq(0).click({ force: true });
                cy.wait(2000)
                cy.get('span[class="ant-select-selection-item"]').invoke('text').then((text) => {
                    expect(text.toLowerCase()).to.include('Yes'.toLowerCase())
                })
                cy.wait(2000)
                cy.get('span[class="ant-select-selection-search"]').eq(0).scrollIntoView().click({ force: true });
                cy.wait(2000)
                cy.get('div[class="ant-select-item-option-content"]').eq(1).click({ force: true });
                cy.wait(2000)
                cy.get('span[class="ant-select-selection-item"]').invoke('text').then((text) => {
                    expect(text.toLowerCase()).to.include('No'.toLowerCase())
                })
                cy.wait(2000)
                cy.get('span[class="ant-select-selection-search"]').eq(1).scrollIntoView().click({ force: true });
                cy.wait(2000)
                cy.get('div[class="ant-select-item-option-content"]').eq(0).click({ force: true });
                cy.wait(2000)
                cy.get('span[class="ant-select-selection-item"]').invoke('text').then((text) => {
                    expect(text.toLowerCase()).to.include('Yes'.toLowerCase())
                })
                cy.wait(2000)
                cy.get('span[class="ant-select-selection-search"]').eq(1).scrollIntoView().click({ force: true });
                cy.wait(2000)
                cy.get('div[class="ant-select-item-option-content"]').eq(3).click({ force: true });
                cy.wait(2000)
                cy.get('span[class="ant-select-selection-item"]').invoke('text').then((text) => {
                    expect(text.toLowerCase()).to.include('No'.toLowerCase())
                    cy.wait(2000)
                })

            }
        })
    })
})