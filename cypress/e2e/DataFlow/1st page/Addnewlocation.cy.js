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
            cy.get('body').should('contain','Add New Location').should('be.visible')
            cy.wait(1500)
            cy.contains('Add New Location').scrollIntoView().click();
            cy.wait(1500)
            cy.get('body').should('contain',"Just to confirm, the patient is at <Summarize the address>, we will be dispatching the ambulance to this location.");
        }
        })          
        })
    })