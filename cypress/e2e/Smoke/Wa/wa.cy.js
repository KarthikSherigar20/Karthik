import login from "../../../support/login";

describe('wa', () => {
    before(() => {
        login()
        cy.log('Login completed')
    })

    it('wa', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(4).click();

        cy.wait(500);

        cy.contains('Create Job').should('be.visible').and('not.be.disabled')

        cy.wait(500);

        const names = ['jobName', 'agentData', 'createdAt', 'updatedAt', 'templateName', 'status']

        names.forEach((name) => {
            cy.get('body').should('contain', name)
        })


    })
})