import login5 from "../../../support/login5-icnrn";

describe('IC-NRN-Ambulance-No-Consultaion-No',()=>{

    before(()=>{
        cy.wrap((null)).then(()=>{
            login5();
        }).then(()=>{
            cy.log('Login completed')
        })
    })

    it('Ambulance-No',()=>{
            cy.get('body').then(($bodyText)=>{
                const bodyText=$bodyText.text();
                if(bodyText.includes('New')){

                    cy.contains('New').prevAll().eq(2).invoke('text').then((text)=>{
                        const storedText=text;
                        cy.log('storedText',storedText);
                        
                        cy.wait(1500);
                        cy.contains('New').click();
                        cy.wait(1500);
                        cy.get('input[value="No"]').eq(0).click();
                        cy.wait(1500);
                        cy.get('body').should('not.contain','Cancel Ticket');
                        cy.wait(1500);
                        cy.get('input[value="No"]').eq(1).click();
                        cy.wait(1500);
                        cy.get('body').should('contain','Cancel Ticket');
                        cy.wait(1500);
                        cy.contains('Cancel Ticket').click();
                        cy.wait(1500);
                        cy.get('body').should('contain','Ticket Cancelled')
                        cy.wait(1500);
                        cy.contains('Tickets').click();
                        cy.wait(1500);
                        cy.contains(storedText).nextAll().eq(2).should('have.text','Cancelled');
                    })
                }
            })
                })
            })