import login from "../../../support/login";

describe('Search Ben-Textfields', () => {
    before(() => {
        login()
        cy.log('Login completed')
    })

    it('Search Ben-Textfields', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(1).click();

        cy.wait(500);

        cy.get('input[class="custominput_input__AQGtC "]').each((input) => {
            cy.wrap(input).scrollIntoView().should('be.enabled').and('be.visible');
        })

    })
})