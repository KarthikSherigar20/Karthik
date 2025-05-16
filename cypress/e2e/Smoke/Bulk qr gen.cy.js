import login from "../../support/login";

describe('Bulk qr gen', () => {
    before(() => {
        login()
        cy.log('Login completed')
    })


    it('Bulk qr gen', () => {
        cy.contains('Bulk Qr Generate').click()

        let texts = ['Bulk-Qr Generator', 'Generate QR and export them to Excel', 'Total QR Count: ', 'Activated QR Count: ',
            'Downloaded QR Count: ', 'NotDownloaded QR Count: ', 'Number of Documents', 'Generate Documents', 'Download Excel']

        cy.get('body').then(($bodyText) => {
            const bodyText = $bodyText.text();

            texts.forEach((text) => {
                expect(bodyText).to.include(text)
            })
        })

        let buttons = ['Generate Documents', 'Download Excel']

        buttons.forEach((bu) => {
            cy.contains(bu).should('be.visible').and('not.be.disabled');
        })

        cy.get('input[class="chakra-input css-1cjy4zv"]').eq(0).should('be.visible').and('not.be.disabled')

        cy.get('input[class="chakra-input css-1cjy4zv"]').eq(1).should('be.visible').and('not.be.disabled');
    })
})

