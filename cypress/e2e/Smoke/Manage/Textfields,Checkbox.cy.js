import login from "../../../support/login";

describe('TF,CB', () => {
    before(() => {
        login()
        cy.log('login completed')
    })

    it('TF,CB', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(2).click();

        cy.wait(500);

        cy.get('input[class="chakra-input css-1cjy4zv"]').each((t) => {
            cy.wrap(t).scrollIntoView().should('be.enabled').and('be.visible');
        })

        cy.wait(500);

        cy.get('span[class="chakra-checkbox__control css-1ydjfm6"]').each((c) => {
            cy.wrap(c).scrollIntoView().should('be.visible').and('not.be.disabled');
        })
    })
})