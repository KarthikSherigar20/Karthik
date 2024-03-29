import Elements from "../../Objects/Elements";
const url=require('../../fixtures/urls.json');

describe('Emergencyready',()=>{
  // Login once before the loop
  before(() => {
    cy.parseXlsx('cypress/Excels/Medical profile.xlsx').then((jsonData) => {
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

 //Medical profile
 it('Adding beneficiaries',()=>{
  cy.parseXlsx('cypress/Excels/Medical profile.xlsx').then((jsonData)=>{
      const rowLength = Cypress.$(jsonData[0].data).length;
      for(let i = 1; i < rowLength; i++){
          const value = jsonData[0].data[i];
          // Adding ben
      const P1 = new Elements();
      cy.wait(1500);
      P1.Addmedicalinfo();
      cy.wait(1500);
      P1.croniccondition();
      cy.wait(5000);
      P1.Bloodgroup(value[2]);
      cy.wait(1500);

      //yes
      // P1.currentmedicationyes();
      // cy.wait(10000);
      
      // P1.allergiestomedicationyes();
      // cy.wait(10000);

      // P1.pastmedicalyes();
      // cy.wait(10000);

      // P1.Recenthospitalizationyes();
      // cy.wait(10000);
      
      // P1.differentlyabbeldyes();
      // cy.wait(10000);
      
      //No
      P1.currentmedicationno();
      cy.wait(1500);

      P1.allergiestomedicationno();
      cy.wait(1500);

      P1.pastmedicalno();
      cy.wait(1500);
      
      P1.Recenthospitalizationno();
      cy.wait(1500);
      
      P1.differentlyabbeldno();
      cy.wait(1500);
      
      P1.Mobilitystatus(value[3]);
      cy.wait(1500);
      P1.saveandcontinue();
      P1.profilepreview();
    }
    //validation
    for(let i=1;i<rowLength;i++){
      const value=jsonData[0].data[i];
      const P1 = new Elements();
      cy.wait(1500);
      cy.contains('Blood Group').scrollIntoView().should('be.visible');
      cy.contains(value[2]).should('exist');
      cy.wait(1500);
    }
  });
});
});
