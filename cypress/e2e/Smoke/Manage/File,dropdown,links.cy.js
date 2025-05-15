import login from "../../../support/login";

describe('F,D,L', () => {
    before(() => {
        login()
        cy.log('Login completed')
    })

    it('F,D,L', () => {
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(2).click();

        cy.wait(500);

        const links = ['div[class="css-1ugipnq"]', 'div[class="css-1h2sv0j"]']

        links.forEach((link) => {
            cy.get(link).each((l) => {
                cy.wrap(l).scrollIntoView().should('be.visible').and('not.be.disabled');
            })
        })

        cy.get('select[class="chakra-select css-161pkch"]')
            .should('be.visible').and('not.be.disabled')

        cy.wait(500);

        cy.get('input[class="chakra-input css-10on6wl"]').each((F) => {
            cy.wrap(F).scrollIntoView().should('be.visible').and('not.be.disabled');
        })

    })
})