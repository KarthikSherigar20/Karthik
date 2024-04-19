import Elements from "../../Objects/Elements";
const url=require('../../fixtures/urls.json');

describe('Insurance information.cy',()=>{
// Login once before the loop
before(() => {
  cy.parseXlsx('cypress/Excels/Insurance information.xlsx').then((jsonData) => {
      const rowLength = Cypress.$(jsonData[0].data).length;
      cy.log(rowLength);
      const firstRow = jsonData[0].data[1]; // Assuming the login details are in the first row 
       
      const selectedEnvironment=url.selectedEnvironment;
      const selectUrl=url.environments[selectedEnvironment];
      
      cy.visit(selectUrl);  //Mention urlname: Dev or Stage or Prod
      
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

it('Insurance information.cy',()=>{
  cy.parseXlsx('cypress/Excels/Insurance information.xlsx').then((jsonData)=>{
      const rowLength = Cypress.$(jsonData[0].data).length;
      for(let i = 1; i < rowLength; i++){
          const value = jsonData[0].data[i];
          // Adding ben
          const P1 = new Elements();
    //Insurance information
      cy.wait(1500);
      // P1.addinsuranceinfo();

      // addinsuranceinfo(){
        cy.get('body').then(($body)=>{
            const bodyText=$body.text();
            if(bodyText.includes('Add InsuranceInfo')){
                cy.contains('Add InsuranceInfo').scrollIntoView().should('be.visible').click();
                cy.wait(1500);
                if(value[2]){
                    P1.Policyid(value[2]);
                    cy.wait(1500);
                  }
                  if(value[3]){
                    P1.thirdpartyname(value[3]);
                    cy.wait(1500);
                  }
                  if(value[4]){
                    P1.policytype(value[4]);
                    cy.wait(1500);
                  }
                  if(value[5]){
                    cy.get
                    P1.insurancecompany(value[5]);
                    cy.wait(1500);
                  }
                  P1.uploaddocument();
                  cy.wait(7000);
                  if(value[2]&&value[5]){
                    P1.ADDinsurance();
                    cy.wait(1500);
                    P1.profilepreview();

                  }
                  else{
                    P1.ADDinsurance();
                    P1.Errormsgforinsu(value[2],value[5]);
                    cy.wait(1500);
                    P1.profilepreview();
                  }
            }else{
                cy.get('div[class="ProfileInsurance_editIcon__4Mq82 css-0"]').click();
                cy.wait(1500);
                if(bodyText.includes(value[2])){
                  console.log('text',bodyText);
                  cy.log('Insurance number is already present')
                  P1.profilepreview();
                }else{
                    cy.contains('Add Another Insurance').click();
                    if(value[2]){
                      P1.Policyid(value[2]);
                      cy.wait(1500);
                    }
                    if(value[3]){
                    P1.thirdpartyname(value[3]);
                    cy.wait(1500);
                  }
                  if(value[4]){
                    P1.policytype(value[4]);
                    cy.wait(1500);
                  }
                  if(value[5]){
                    cy.get
                    P1.nameofinsurer(value[5]);
                    cy.wait(1500);
                  }
                  P1.uploaddocument();
                  cy.wait(7000);
                  if(value[2]&&value[5]){
                    cy.get('button[class="chakra-button css-38nwlg"]').click({force:true});
                    cy.wait(1500);
                    P1.profilepreview();
                    
                  }
                  else{
                    cy.get('button[class="chakra-button css-38nwlg"]').click({force:true});
                    P1.Errormsgforinsu(value[2],value[5]);
                    cy.wait(1500);
                    cy.get('button[class="chakra-button css-ez23ye"]').click();
                    cy.wait(1500);
                    P1.profilepreview();
                  }
                  
                }
                }
              })
            }
            //validation
            for(let i=1;i<rowLength;i++){
              const value=jsonData[0].data[i];
              console.log('rowlength',rowLength);
              console.log('value',value);
              processValue(value);
            }
              function processValue(value){
                cy.get('body').then(($bodyText)=>{
                  const bodyText=$bodyText.text();
                  if(!bodyText.includes(value[2])){
                    if(value[2]&&value[5]){
                      const P1 = new Elements();
                      // P1.profilepreview();
                      cy.wait(1500);
                      cy.contains('Insurance Info').scrollIntoView().should('be.visible');
                      cy.wait(1500);
                      cy.contains(value[2]).should('be.visible');
                      cy.wait(1500);
                      
                    }
                  }
                })
              }
          });
        });
      });
