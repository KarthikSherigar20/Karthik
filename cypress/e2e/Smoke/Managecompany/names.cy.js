import login from "../../../support/login";

describe('names', () => {
    before(() => {
        login()
        cy.log('Login completed')
    })

    it('names', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(8).click();

        cy.wait(500)

        const names = ['Manage Company', 'Company Name', 'Subscription Type', 'Logo URL', 'Web Context', 'Email Pattern', 'Sl.No', 'Company Name',
            'Subscription Type', 'Date of Partnership']

        names.forEach((name) => {
            cy.get('body').should('contain', name)
        })

    })
})
