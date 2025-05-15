import login from "../../../support/login";

describe('Email', () => {
    before(() => {
        login()
        cy.log('Login completed')
    })

    it('Email', () => {

        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(5).click();

        cy.wait(500)

        cy.get('button[class="chakra-button css-h211ee"]').should('be.visible').and('not.be.disabled')

        cy.wait(500)

        const names = ['JOB NAME', 'AGENT', 'CREATED AT', 'UPDATED AT', 'STATUS']

        names.forEach((name) => {
            cy.get('body').should('contain', name)
        })

    })
})