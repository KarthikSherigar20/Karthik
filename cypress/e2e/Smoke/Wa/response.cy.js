import login from "../../../support/login";

describe('res', () => {
    before(() => {
        login()
        cy.log('Login completed')
    })

    it('res', () => {

        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(6).click();

        cy.wait(500);

        const names = ['Whatsapp Job List', 'jobName', 'agentData', 'createdAt', 'updatedAt', 'status']

        names.forEach((name) => {
            cy.get('body').should('contain', name);
        })

    })
})