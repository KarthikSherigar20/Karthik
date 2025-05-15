import login from "../../../support/login";

describe('Ticketstatus', () => {
    before(() => {
        cy.wrap(null).then(() => {
            login();
        }).then(() => {
            cy.log('Login completed');
        });
    });

    it('Ticketstatus', () => {
        cy.get('span[class="ant-select-selection-placeholder"]').eq(0)
            .click({ force: true });
        cy.wait(1000);
        cy.get('div[class="ant-select-item-option-content"]').eq(0).click();
        cy.wait(1000);
        cy.get('span[class="ant-select-selection-item"]').eq(0).invoke('text').then(text => {
            expect(text.trim()).to.include('New');
        })
        cy.wait(1000);
        cy.get('span[class="ant-select-selection-item"]').eq(0).click();
        cy.wait(1000);
        cy.get('div[class="ant-select-item-option-content"]').eq(1).click();
        cy.wait(1000);
        cy.get('span[class="ant-select-selection-item"]').eq(0).invoke('text').then(text => {
            expect(text.trim()).to.include('Work In Progress');
        })
        cy.wait(1000);
        cy.get('span[class="ant-select-selection-item"]').eq(0).click();
        cy.wait(1000);
        cy.get('div[class="ant-select-item-option-content"]').eq(2).click();
        cy.wait(1000);
        cy.get('span[class="ant-select-selection-item"]').eq(0).invoke('text').then(text => {
            expect(text.trim()).to.include('Cancelled');
        })
        cy.wait(1000);
        cy.get('span[class="ant-select-selection-item"]').eq(0).click();
        cy.wait(1000);
        cy.get('div[class="ant-select-item-option-content"]').eq(3).click();
        cy.wait(1000);
        cy.get('span[class="ant-select-selection-item"]').eq(0).invoke('text').then(text => {
            expect(text.trim()).to.include('Completed');
        })
        cy.wait(1000);
        cy.get('span[class="ant-select-selection-item"]').eq(0).click();
        cy.wait(1000);
        cy.get('div[class="ant-select-item-option-content"]').eq(4).click();
        cy.wait(1000);
        cy.get('span[class="ant-select-selection-item"]').eq(0).invoke('text').then(text => {
            expect(text.trim()).to.include('TestDemo');
        })
        cy.wait(1000);
        cy.get('span[class="ant-select-selection-item"]').eq(0).click();
        cy.wait(1000);
        cy.get('div[class="ant-select-item-option-content"]').eq(5).click();
        cy.wait(1000);
        cy.get('span[class="ant-select-selection-item"]').eq(0).invoke('text').then(text => {
            expect(text.trim()).to.include('Customer Test');
        })
        cy.wait(1000);
        cy.get('span[class="ant-select-selection-item"]').eq(0).click();
        cy.wait(1000);
        cy.get('div[class="ant-select-item-option-content"]').eq(6).click();
        cy.wait(1000);
        cy.get('span[class="ant-select-selection-item"]').eq(0).invoke('text').then(text => {
            expect(text.trim()).to.include('Internal Test');
        })
        cy.wait(1000);
        cy.get('span[class="ant-select-selection-item"]').eq(0).click();
        cy.wait(1000);
        cy.get('div[class="ant-select-item-option-content"]').eq(7).click();
        cy.wait(1000);
        cy.get('span[class="ant-select-selection-item"]').eq(0).invoke('text').then(text => {
            expect(text.trim()).to.include('GeneralEnquiry');
        })


    });
});
