describe('Login with microsoft', () => {
    it('Login', () => {
        cy.visit('https://adminapp.dev.pococare.com/')
        cy.wait(2000);
        cy.get('button[type="button"]').should('be.visible').should('not.be.disabled');
        cy.wait(2000);
        cy.get('body').should('contain', 'Login with Microsoft').should('be.visible');
    })
})