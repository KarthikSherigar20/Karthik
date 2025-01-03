import login from "../../../support/login";

describe('GE-ID-ER',()=>{
    before(()=>{
        cy.wrap((null)).then(()=>{
            login();
        }).then(()=>{
            cy.log('Login completed')
        })
    })
    it('GE-ID-ER',()=>{
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            if(bodyText.includes('New')){

                cy.wait(1500);
                cy.contains('New').prevAll().eq(2).invoke('text').then((text)=>{
                    const storedText=text;
                    cy.log('storedText',storedText);
                    cy.wait(1500);
                    cy.contains('New').click();
                    cy.wait(1500);
                    cy.contains('No').click();
                    cy.wait(1500);
                    cy.get('body').should('not.contain','Insurance details');
                    cy.wait(1500);
                    cy.get('body').should('not.contain','Nearest Hospital');
                    cy.wait(1500);
                    cy.contains('General Enquiry').scrollIntoView().click();
                    cy.wait(1500);
                    cy.get('body').should('contain','Insurance details');
                    cy.wait(1500);
                    cy.get('body').should('contain','Nearest Hospital');
                    cy.wait(1500)
                    cy.get('body').should('not.contain','Resolve Emergency');
                    cy.wait(1500)
                    cy.contains('Nearest Hospital').click();
                    cy.wait(1500)
                    cy.get('body').should('contain','Resolve Emergency');
                    cy.wait(1500)
                    cy.contains('Resolve Emergency').scrollIntoView().click();
                    cy.wait(2000);
                    cy.contains(storedText).nextAll().eq(2).should('have.text','GeneralEnquiry')
                })
            }
        })
            })
        })