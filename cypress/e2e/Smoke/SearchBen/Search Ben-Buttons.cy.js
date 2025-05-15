import login from "../../../support/login";

describe('Search Ben-Buttons', () => {
    before(() => {
        login()
        cy.log('Login completed')
    })

    it('Search Ben-Buttons', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(1).click();

        cy.wait(500);

        cy.get('button[class="BenAddressData_button__0kXLn"]').each((button) => {
            cy.wrap(button).scrollIntoView().should('be.enabled').and('be.visible')
        })

        // cy.get('button[class="customButton_button__Ol41S BenAddressData_button__0kXLn"]')
        // .scrollIntoView().should('be.enabled').and('be.visible');


    })

})