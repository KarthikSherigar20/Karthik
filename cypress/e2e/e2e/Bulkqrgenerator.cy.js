import login from "../../support/login";


describe('BulkQrGenerator', () => {
    before(() => {
        login();
        cy.log('Login completed');
    });

    it('Bulk Qr', () => {
        cy.get('svg.chakra-icon.css-6ey7w3').eq(0).scrollIntoView().click();
        cy.wait(500);
        cy.get('body').should('contain', 'Bulk Qr Generate');
        cy.contains('Bulk Qr Generate').click();

        cy.contains('NotDownloaded QR Count:')
            .invoke('text')
            .then((text) => {
                const match = text.match(/\d+/);
                const count = match ? parseInt(match[0], 10) : 0;
                cy.log('Extracted Count:', count);

                if (count > 0) {
                    cy.get('input.chakra-input.css-1cjy4zv').eq(1).type('1');
                    cy.contains('Download Excel').click();
                }
            });
    });
});
