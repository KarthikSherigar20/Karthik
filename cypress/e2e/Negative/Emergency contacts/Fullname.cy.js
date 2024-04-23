import Elements from "../../../Objects/Elements";
import url from "../../../fixtures/urls.json"

describe('Emergency contacts',()=>{
    before(() => {
        cy.parseXlsx('cypress/Excels/Negative/Emergency contacts/Full name.xlsx').then((jsonData) => {
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
    it('Fullname',()=>{
        cy.parseXlsx('cypress/Excels/Negative/Emergency contacts/Full name.xlsx').then((jsonData)=>{
            let rowLength = Cypress.$(jsonData[0].data).length;
            console.log('row---1',rowLength);
            
            cy.wait(1500);
            const P1 = new Elements();
            for(let i = 1; i < rowLength; i++){
                const value = jsonData[0].data[i];
                console.log('value',value);
            cy.wait(1000);
            P1.emergencycontacts();
            if(value.length!==0){

                cy.contains('Add Another Contact').then(($btn)=>{
                    if($btn.is(':disabled')){
                        cy.log('Maximum limit is already reached');
                        P1.profilepreview();
                    }else{
                        cy.wait(1500);
                        P1.addanothercontact();
                        cy.wait(1500);
                        
                        cy.get('body').then(($bodyText)=>{
                            const bodyText=$bodyText.text();
                            if(!bodyText.includes(value[3])){
                                
                                if(value[3]!==null && value[3]!==undefined){
                                    P1.Funame(value[3]);
                                }
                                cy.wait(1500);
                                if(value[4]!==null && value[4]!==undefined){
                                    P1.Relationship(value[4]);
                                }
                                cy.wait(1500);
                                if(value[5]!==null && value[5]!==undefined){
                                    P1.Mobileno(value[5]);
                                }
                                cy.wait(1500);
                                if(value[3]!==null && value[3]!==undefined &&
                                    value[4]!==null && value[4]!==undefined &&
                                    value[5]!==null && value[5]!==undefined ){
                                        P1.whatspp();
                                        cy.wait(1500);
                                        P1.savee();
                                        cy.wait(1500);
                                        P1.profilepreview();
                                    }
                    
                                    if(value[3]===null || value[3]===undefined ||
                                        value[4]===null || value[4]===undefined ||
                                        value[5]===null || value[5]===undefined ){
                                            cy.wait(2000);
                                            P1.savee();
                                            cy.wait(1500);
                                            P1.checkErrormessage(value[3],value[4],value[5]);
                                            cy.wait(1500);
                                            cy.contains('Cancel').click();
                                            P1.profilepreview();
                                        }
                                    }else{
                                        cy.log("This contact is already present");
                                        cy.get('button[class="chakra-button css-ez23ye"]').click();
                                        P1.profilepreview();
                                    }
                                });
                            }
                        })
                    }
            }
        })
    })

})