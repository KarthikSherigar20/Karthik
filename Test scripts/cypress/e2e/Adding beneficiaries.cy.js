import Elements from "../Objects/Elements";
const url= require('../fixtures/urls.json');

describe('Adding beneficiaries',()=>{
    // Login once before the loop
    before(() => {
        cy.parseXlsx('cypress/Excels/Adding beneficiaries.xlsx').then((jsonData) => {
            const rowLength = Cypress.$(jsonData[0].data).length;
            cy.log(rowLength);
            const firstRow = jsonData[0].data[1]; // Assuming the login details are in the first row
 
                cy.visit(url.Dev);  //Mention urlname: Dev or Stage or Prod

                const P1 = new Elements();
                P1.loginbtn();
                P1.email(firstRow[0]); // Assuming email is in the first column
                P1.sendotp();
                cy.wait(11000);
                P1.verify();
                cy.wait(1500);
            });
        });
        
        it('Adding beneficiaries',()=>{
            cy.parseXlsx('cypress/Excels/Adding beneficiaries.xlsx').then((jsonData)=>{
                const rowLength = Cypress.$(jsonData[0].data).length;
                console.log('before',jsonData[0].data,rowLength);
                for(let i = 1; i < rowLength; i++){
                console.log('after',i,rowLength);
                const value = jsonData[0].data[i];
                console.log('value',value);
                console.log('valuelength',value.length);
                if(value.length !==0){

                    // Adding ben
                    const P1 = new Elements();
                    P1.Addben();
                    cy.wait(1500);
                    P1.Fullname(value[1]);
                    cy.wait(1500);
                    P1.Select(value[2]);
                    cy.wait(1500);
                    P1.mob(value[3]);
                    cy.wait(1500);
                    P1.City(value[4]);
                    cy.wait(1500);
                    P1.pincode(value[5]);
                    cy.wait(1500);
                    P1.Addd();
                    cy.wait(3500);
                }
                // P1.profilepreview();
            }
            //validation
            for(let i=1;i<rowLength;i++){
                const value=jsonData[0].data[i];
                const P1 = new Elements();

                    const an=value[1];
                    if(an){

                        const aan=an.toUpperCase();
                        
                        cy.contains(aan).should('exist');
                        cy.wait(1500);
                        console.log('Ben is present');
                        cy.wait(1500);
                        
                        cy.contains('SELF').then(($self)=>{
                            const selfna=$self.prev().text().toLowerCase();
                            cy.wait(1500);
                            const selfname=selfna.charAt(0).toUpperCase()+selfna.slice(1);
                            cy.contains(aan).click();
                            cy.wait(1500);
                            P1.emergencycontacts();
                            cy.wait(1500);
                            cy.contains(selfname).should('exist');
                            cy.wait(1500);
                            console.log('Emergency contact is present');
                            
                            cy.wait(1500);
                            cy.get('img[alt="logo"]').click();
                            
                        })
                    }
            };
        });
    });
});
