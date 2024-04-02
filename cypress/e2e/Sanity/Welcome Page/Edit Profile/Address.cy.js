import url from '../../../../fixtures/urls.json';
import un from '../../../../fixtures/UN&PASS.json';

describe('Basic information',()=>{
    it('Checking Basic information page',()=>{
        const selectedEnvironment=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironment];

        cy.visit(selectUrl);
        cy.wait(1500);
        cy.contains('Login').click();
        cy.wait(1500);
        cy.get('input[id="email"]').type(un.Un);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
        cy.wait(10000);
        cy.contains('Verify').click();
        cy.wait(1500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text()
        })
        cy.contains('Complete Profile').eq(0).click();
        cy.wait(1500);
        cy.contains('Address').should('be.visible').should('not.be.disabled').click();
        cy.wait(1500);

        const cssLocator='div[class="chakra-card css-1urwt3e"]';
        cy.get(cssLocator).then(element=>{
            const classes=element.attr('class').split(' ').filter(Boolean);

            const classCount=classes.length;
            cy.log('classes',classCount);
            if(classCount===3){
                cy.contains('Add Another Address').should('not.be.visible').should('be.disabled');
            }else{
                cy.contains('Add Another Address').should('be.visible').should('not.be.disabled');
            }
        })
    })
})