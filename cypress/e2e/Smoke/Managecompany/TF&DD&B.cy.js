import login from "../../../support/login";

describe('TF&DD&B', () => {
    before(() => {
        login()
        cy.log('Login completed')
    })

    it('O', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(8).click();

        cy.wait(500);

        const buttons = ['input[class="chakra-input css-1cjy4zv"]', 'select[class="chakra-select css-161pkch"]', 'button[type="button"]']

        buttons.forEach((button) => {
            cy.get(button).each((bu) => {
                cy.wrap(bu).should('be.visible').and('not.be.disabled')
            })
        })

    })
})