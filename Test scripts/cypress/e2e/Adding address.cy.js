import Elements from "../Objects/Elements";
const url=require('../fixtures/urls.json');

describe('Adding address.cy', () => {
    // Login once before the loop
    before(() => {
        cy.parseXlsx('cypress/Excels/Adding address.xlsx').then((jsonData) => {
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
            const profilename=firstRow[1];
            const upc=profilename.toUpperCase();
            cy.contains(upc).click();
        });
    });

    //Adding Address 
    it('Adding address', () => {
        cy.parseXlsx('cypress/Excels/Adding address.xlsx').then((jsonData) => {
            const rowLength = Cypress.$(jsonData[0].data).length;
            for (let i = 1; i < rowLength; i++) {
                const value = jsonData[0].data[i];
                // Adding ben
                const P1 = new Elements();
                cy.wait(1500);
                P1.address();
                cy.wait(1500);
                P1.addanotheraddress();
                cy.wait(1500);
                P1.addnew();
                cy.wait(1500);
                P1.label(value[2]);
                cy.wait(1500);
                P1.Houseno(value[3]);
                cy.wait(1500);
                P1.Area(value[4]);
                cy.wait(1500);
                P1.Landmark(value[5]);
                cy.wait(1500);
                P1.Pincode(value[6]);
                cy.wait(1500);
                P1.town(value[7]);
                cy.wait(1500);
                P1.State(value[8]);
                cy.wait(1500);
                P1.Ambulance(value[9]);
                cy.wait(1500);
                P1.lift(value[10]);
                cy.wait(1500);
                P1.locate();
                cy.wait(15000);
                P1.saveaddress();
                cy.wait(1500);
                P1.profilepreview();
            }
            //Validation
            for(let i=1;i<rowLength;i++){
                const value=jsonData[0].data[i];
                const P1 = new Elements();
                cy.wait(1500);
                P1.address();
                cy.wait(1500);
                cy.contains(value[3]).should('exist');
                cy.wait(1500);
                P1.profilepreview();
            }
        });
    });
});


