import Elements from "../Objects/Elements";
const url=require('../fixtures/urls.json');

describe('Add emergency Contacts.cy',()=>{
  before(() => {
    cy.parseXlsx('cypress/Excels/Add emergency Contacts.xlsx').then((jsonData) => {
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
it('Add emergency Contacts',()=>{
  cy.parseXlsx('cypress/Excels/Add emergency Contacts.xlsx').then((jsonData)=>{
      const rowLength = Cypress.$(jsonData[0].data).length;
      for(let i = 1; i < rowLength; i++){
          const value = jsonData[0].data[i];
          // Adding emergency contacts
      const P1 = new Elements();
      cy.wait(1500);
      P1.emergencycontacts();
      cy.wait(1500);
      P1.addanothercontact();
      cy.wait(1500);
      P1.Funame(value[2]);
      cy.wait(1500);
      P1.Relationship(value[3]);
      cy.wait(1500);
      P1.Mobileno(value[4]);
      cy.wait(1500);
      P1.whatspp();
      cy.wait(1500);
      P1.savee();
      cy.wait(1500);
      P1.profilepreview();
    }
    //Validation
    for(let i=1;i<rowLength;i++){
      const P1 = new Elements();
      cy.wait(2000);
      P1.emergencycontacts();
      cy.wait(2000);
      const value=jsonData[0].data[i];
      cy.contains(value[2]).should('exist');
      cy.wait(2000);
        P1.profilepreview();

    };
  });
});
});
