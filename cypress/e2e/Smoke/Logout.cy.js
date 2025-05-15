import login from "../../support/login";

describe('Logout', () => {
    before(() => {
        login()
        cy.log('Login completed')
    })

    it('Logout', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(11).click();

        cy.wait(500)

        const names = ['Login with Microsoft ', 'Admin Login']

        names.forEach((name) => {
            cy.get('body').should('contain', name);

        })
    })
})