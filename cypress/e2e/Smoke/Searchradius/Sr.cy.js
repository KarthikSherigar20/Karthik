import login from "../../../support/login";

describe('SR', () => {
    before(() => {
        login()
        cy.log('login completed')
    })

    it('sr', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(7).click();

        cy.wait(500);

        cy.get('body').should('contain', 'Beneficiary Having No Hospital Dashboard Details')

        cy.get('select[id="hospital-select"]').should('be.visible').and('not.be.disabled')

        cy.get('input[type="number"]').should('be.visible').and('not.be.disabled')

        const buttons = ['button[class="benificiary_searchButton__ctiGl"]', 'button[class="benificiary_clearButton__p2Yag"]']

        buttons.forEach((button) => {
            cy.get(button)
                .should('be.visible').and('not.be.disabled')
        })

    })
})