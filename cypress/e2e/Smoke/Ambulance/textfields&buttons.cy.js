import login from "../../../support/login";

describe('textfields&buttons', () => {
    before(() => {
        login()
        cy.log('Login completed')
    })

    it('textfields&buttons', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(9).click();

        cy.wait(500)

        cy.get('input[class="chakra-input css-1cjy4zv"]').then((elements) => {
            const ele = elements.slice(0, 8);
            cy.wrap(ele).each((el) => {
                cy.wrap(el).scrollIntoView().
                    should('be.visible').and('not.be.disabled');

                cy.wait(500)

                cy.get('button[type="button"]').then((but) => {
                    const bu = but.slice(0, 6)
                    cy.wrap(bu).each((b) => {
                        cy.wrap(b).scrollIntoView().should('be.visible').and('not.be.disabled')
                    })
                })
            })
        })
    })
})