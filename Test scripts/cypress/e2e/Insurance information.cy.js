import Elements from "../Objects/Elements";
const url=require('../fixtures/urls.json');

describe('Insurance information.cy',()=>{
// Login once before the loop
before(() => {
  cy.parseXlsx('cypress/Excels/Insurance information.xlsx').then((jsonData) => {
      const rowLength = Cypress.$(jsonData[0].data).length;
      cy.log(rowLength);
      const firstRow = jsonData[0].data[1]; // Assuming the login details are in the first row
      
      cy.visit(url.Dev);  //Mention urlname: Dev or Stage or Prod
      
      const P1 = new Elements();
      P1.loginbtn();
      P1.email(firstRow[0]); // Assuming email is in the first column
      P1.sendotp();
      cy.wait(15000);
      P1.verify();
      cy.wait(1500);
      const profilename=firstRow[1];
      const upc=profilename.toUpperCase();
      cy.contains(upc).click();
  });
});

it('Insurance information.cy',()=>{
  cy.parseXlsx('cypress/Excels/Insurance information.xlsx').then((jsonData)=>{
      const rowLength = Cypress.$(jsonData[0].data).length;
      for(let i = 1; i < rowLength; i++){
          const value = jsonData[0].data[i];
          // Adding ben
          const P1 = new Elements();
    //Insurance information
      cy.wait(1500);
      P1.addinsuranceinfo();
      cy.wait(1500);
      P1.Policyid(value[2]);
      cy.wait(1500);
      P1.thirdpartyname(value[3]);
      cy.wait(1500);
      P1.policytype(value[4]);
      cy.wait(1500);
      P1.insurancecompany(value[5]);
      cy.wait(1500);
      P1.uploaddocument();
      cy.wait(7000);
      P1.ADDinsurance();
      cy.wait(7000);
    }
    //validation
    for(let i=1;i<rowLength;i++){
      const value=jsonData[0].data[i];
      const P1 = new Elements();
      P1.profilepreview();
      cy.wait(1500);
      cy.contains('Insurance Info').scrollIntoView().should('be.visible');
      cy.wait(1500);
      cy.contains('Policy ID').next().invoke('text').then(($id)=>{
      expect(String($id).trim()).to.equal(String(value[2]).trim());
      })
      cy.wait(1500);
      cy.contains('Name of the Insurance').next().invoke('text').then(($insu)=>{
        expect(String($insu).trim()).to.equal(String(value[5]).trim());
      })
    }
  });
});
});
