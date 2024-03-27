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

                    if(value[1]!==null && value[1]!==undefined){
                        P1.Fullname(value[1]);
                        cy.wait(1500);
                    }
                    if(value[2]!==null && value[2]!==undefined){
                        P1.Select(value[2]);
                        cy.wait(1500);
                    }
                    if(value[3]!==null && value[3]!==undefined){
                        P1.mob(value[3]);
                        cy.wait(1500);
                    }
                    if(value[4]!==null && value[4]!==undefined){
                        P1.City(value[4]);
                        cy.wait(1500);
                    }
                    if(value[5]!==null && value[5]!==undefined){
                        P1.pincode(value[5]);
                        cy.wait(1500);
                    }
                    if(value[1]!==null && value[1]!==undefined &&
                        value[2]!==null && value[2]!==undefined &&
                        value[3]!==null && value[3]!==undefined &&
                        value[4]!==null && value[4]!==undefined &&
                        value[5]!==null && value[5]!==undefined){
                            P1.Addd();
                        }
                        else{
                        P1.Addd();
                        P1.Errormsgforben(value[1],value[2],value[3],value[4],value[5])
                        cy.wait(1500);
                        cy.contains('Cancel').click();
                    }
                    cy.wait(3500);
                    cy.reload();

                }
            }
            //validation
            for(let i=1;i<rowLength;i++){
                const value=jsonData[0].data[i];
            if(value[1]!==null && value[1]!==undefined &&
                value[2]!==null && value[2]!==undefined &&
                value[3]!==null && value[3]!==undefined &&
                value[4]!==null && value[4]!==undefined &&
                value[5]!==null && value[5]!==undefined){

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
                    }
            };
        });
    });
});
