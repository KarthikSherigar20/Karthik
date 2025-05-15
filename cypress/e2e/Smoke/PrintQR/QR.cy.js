import login from "../../../support/login";

describe('Buttons', () => {
    before(() => {
        login()
        cy.log('Login completed')
    })

    it('QR', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(3).click();

        cy.wait(500);

        cy.get('button[type="button"]').should('be.visible')
            .and('not.be.disabled')

        const names = ['Task Name', 'Agent Id', 'Created At', 'Updated At', 'Status']

        names.forEach((name) => {
            cy.get('body').should('contain', name);
        })

    })
})