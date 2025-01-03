import login from "../../../support/login";

describe('Address',()=>{
    before(()=>{
        cy.wrap((null)).then(()=>{
            login()
        }).then(()=>{
            cy.log('Login completed')
        })
    })
    it('Address',()=>{
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text()
            if(bodyText.includes('New')){

                cy.contains('New').click();
                cy.wait(1500);
                cy.get('input[class="radioButton_radio__Dmg-B"]').eq(3).scrollIntoView().click();
                cy.wait(1500);
                cy.get('input[class="radioButton_radio__Dmg-B"]').eq(7).scrollIntoView().click();
                cy.wait(1500);
                cy.get('input[name="isAmbulanceRequired"]').eq(1).click();
                cy.wait(1500);
                cy.contains('Save Assessment').scrollIntoView().click();
                cy.wait(1500);
                cy.get('input[type="radio"]').eq(0).click();
                cy.wait(1500);
                cy.get('body').should('contain','Preferred Hospital');
                cy.wait(1500);
                cy.get('body').should('contain','Increase Search Radius');
                cy.wait(1500);
                cy.get('body').should('contain','Select Drop Location');
                cy.wait(1500);
                cy.contains('Edit').scrollIntoView().click();
                cy.wait(1500);
                cy.get('body').should('not.contain','Preferred Hospital');
                cy.wait(1500);
                cy.get('body').should('not.contain','Increase Search Radius');
                cy.wait(1500);
                cy.get('body').should('not.contain','Select Drop Location');
            }
        })
            })
        })