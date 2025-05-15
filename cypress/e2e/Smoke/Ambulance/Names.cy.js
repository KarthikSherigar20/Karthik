import login from "../../../support/login";

describe('Names', () => {
    before(() => {
        login()
        cy.log('Login completed')
    })

    it('Names', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(9).click();

        cy.wait(500);

        const names = ['Ambulance Provider', 'Name', 'Address Line 1', 'City', 'State', 'Country', 'PinCode', 'Contact Number', 'Contact Email']

        names.forEach((name) => {
            cy.get('body').should('contain', name);
        })







    })
})