import login from "../../../support/login";

describe('Logout', () => {
    before(() => {
        cy.wrap(null).then(() => {
            login();
        }).then(() => {
            cy.log('Login completed');
        });
    });

    it('Logout', () => {
        cy.get('body').should('contain','Logout').should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.contains('Logout').click();
        cy.wait(1000);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText.includes('Admin Login'));
            expect(bodyText.includes('Login with Microsoft'));
        })
    });
});
