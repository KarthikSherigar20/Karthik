import Elements from '../../../Objects/Elements';
const url=require('../../../fixtures/urls.json');

describe('Adding address.cy', () => {
    // Login once before the loop
    before(() => {
        cy.parseXlsx('cypress/Excels/Negative/Adding address/House No.xlsx').then((jsonData) => {
            const rowLength = Cypress.$(jsonData[0].data).length;
            cy.log(rowLength);
            const firstRow = jsonData[0].data[1]; // Assuming the login details are in the first row

            const selectedEnvironment=url.selectedEnvironment;
            const selectUrl=url.environments[selectedEnvironment];
            
            cy.visit(selectUrl);  //Mention urlname: Dev or Stage or Prod
            // cy.visit('https://customerapp.dev.pococare.com/dashboard');  //Mention urlname: Dev or Stage or Prod
            
            const P1 = new Elements();
            P1.loginbtn();
            P1.email(firstRow[0]); // Assuming email is in the first column
            P1.sendotp();
            cy.wait(3500);
            P1.PTA();
            cy.wait(1000);
            P1.OTP();
            cy.wait(1000);
            P1.verify();
            cy.wait(1500);
            const profilename=firstRow[1];
            const upc=profilename.toUpperCase();
            cy.contains(upc).click();
        });
    });

    //Adding Address 
    it('House No', () => {
        cy.parseXlsx('cypress/Excels/Negative/Adding address/House No.xlsx').then((jsonData) => {
            const rowLength = Cypress.$(jsonData[0].data).length;
            let conditionMet=false;

            for (let i = 1; i < rowLength; i++) {
                const value = jsonData[0].data[i];
                // Adding ben
                const P1 = new Elements();
                if(value.length!==0){

                    cy.wait(1500);
                    P1.address();
                    cy.wait(1500);
                    P1.addanotheraddress();
                    cy.wait(1500);
                    P1.addnew();
                    cy.wait(1500);
                    
                    if(value[3]!==null && value[3]!==undefined){
                        P1.label(value[3]);
                        cy.wait(1500);
                    }
                    if(value[4]!==null && value[4]!==undefined){
                        P1.Houseno(value[4]);
                        cy.wait(1500);
                    }
                    if(value[5]!==null && value[5]!==undefined){
                        P1.Area(value[5]);
                        cy.wait(1500);
                    }
                    if(value[6]!==null && value[6]!==undefined){
                        P1.Landmark(value[6]);
                        cy.wait(1500);
                    }
                    if(value[7]!==null && value[7]!==undefined){
                        P1.Pincode(value[7]);
                        cy.wait(1500);
                    }
                    if(value[8]!==null && value[8]!==undefined){
                        P1.town(value[8]);
                        cy.wait(1500);
                    }
                    if(value[9]!==null && value[9]!==undefined){
                        P1.State(value[9]);
                        cy.wait(1500);
                    }
                    if(value[10]){
                        P1.Ambulance(value[10]);
                        cy.wait(1500);
                    }
                    if(value[11]){
                        P1.lift(value[11]);
                        cy.wait(1500);
                    }
                    if( value[3]===null || value[3]===undefined ||
                        value[4]===null || value[4]===undefined || 
                        value[5]===null || value[5]===undefined ||
                        value[6]===null || value[6]===undefined ||
                        value[7]===null || value[7]===undefined ||
                        value[8]===null || value[8]===undefined ||
                        value[9]===null || value[9]===undefined ){
                            P1.locate();
                            cy.wait(1500);
                            P1.Errormsgforadd(value[3],value[4],value[5],value[6],value[7],value[8],value[9]);
                            cy.wait(1500);
                            cy.contains('Cancel').click();
                            P1.profilepreview();
                            
                        }
                    }
            }
        });
    });
});


