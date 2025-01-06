import login from "../../../support/login";

describe('Buttons', () => {
    before(() => {
        cy.wrap(null).then(() => {
            login();
        }).then(() => {
            cy.log('Login completed');
        });
    });

    it('Buttons', () => {
        cy.get('div[class="ant-picker ant-picker-range ant-picker-outlined css-zg0ahe sc-aYaIB jefQnB"]').should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.get('span[class="ant-select-selection-search"]').eq(0).should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.get('span[class="ant-select-selection-search"]').eq(1).should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.get('button[class="button undefined ticketFilter_button__QAw0v"]').should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.get('div[class="ant-col css-zg0ahe"]').eq(0).should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.get('div[class="ant-col css-zg0ahe"]').eq(1).should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.get('body').should('contain','Tickets').should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.get('body').should('contain','Logout').should('be.visible').should('not.be.disabled')
        cy.wait(1500);
    });
});
