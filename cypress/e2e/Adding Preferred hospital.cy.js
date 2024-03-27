import Elements from "../../Objects/Elements";
const url=require('../fixtures/urls.json');

describe('Preferred hospital',()=>{
   // Login once before the loop
   before(() => {
    cy.parseXlsx('cypress/Excels/Preferred hospital.xlsx').then((jsonData) => {
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

   //Preferred hospital
   it('Preferred hospital',()=>{
    cy.parseXlsx('cypress/Excels/Preferred hospital.xlsx').then((jsonData)=>{
        const rowLength = Cypress.$(jsonData[0].data).length;
        for(let i = 1; i < rowLength; i++){
            const value = jsonData[0].data[i];
            // Adding ben
      const P1 = new Elements();
      cy.wait(1500);
      P1.preferredhospital();
      cy.wait(1500);
      P1.Addhospital();
      cy.wait(1500);
      P1.Cityname(value[2]);
      cy.wait(1500);
      P1.Hospitalname(value[3]);
      cy.wait(5000);
      P1.savehospital();
      cy.wait(1500);
    }
     //validation
     for(let i=1;i<rowLength;i++){
      const value=jsonData[0].data[i];
      const P1 = new Elements();
      cy.wait(2000);
      cy.contains('Preferred Hospital').scrollIntoView().should('be.visible');
      cy.wait(2000);
      cy.contains('Add Preferred Hospital').should('not.exist');
     }
  });
});
});
