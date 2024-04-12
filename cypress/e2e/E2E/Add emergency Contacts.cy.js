import Elements from '../../Objects/Elements';
import url from '../../fixtures/urls.json';

describe('Add emergency Contacts.cy',()=>{
  before(() => {
    cy.parseXlsx('cypress/Excels/Add emergency Contacts.xlsx').then((jsonData) => {
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
        cy.wait(10000);
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
      console.log('row---1',rowLength);
      let conditionMet=false;
      for(let i = 1; i < rowLength; i++){
        const value = jsonData[0].data[i];
        
          console.log('cond---2',conditionMet,value);
          if(conditionMet){
           break;
          }
          // Adding emergency contacts
          if(value.length!==0){
            const P1 = new Elements();
            cy.wait(1500);
            P1.emergencycontacts();
            cy.wait(1500);
            P1.addanothercontact();
            cy.wait(1500);
            if(value[2]){
              console.log('value[2]---3',value[2]);
              conditionMet=true;
              function capital(sentence){
                return sentence.split(' ').map(word=>{
                  return word.charAt(0).toUpperCase()+word.slice(1).toLowerCase();
                }).join(' ');
              }
              let partialText=capital(value[2]);
              cy.get('body').then(($bodyText)=>{
              const  text=$bodyText.text();
              // console.log('partoaal',partialText);
              // console.log('part-----',text);

              const searchText = text.toUpperCase();
              const searchValue = partialText.toUpperCase();
              const occurrences = searchText.split(searchValue).length - 1;
              console.log("---4",occurrences);


              if(occurrences===1){
                cy.get('select[class="chakra-select css-161pkch"]').eq(0).then(($select)=>{
                  const options=$select.find('option').toArray();
                  const optionswithpartialltext=options.find(option =>option.innerText.includes(partialText));
                  if(optionswithpartialltext){
                    cy.wrap(optionswithpartialltext).invoke('text').then(optionText =>{
                      console.log('Select option:', optionText);
                      cy.wrap(optionswithpartialltext).parent().select(optionText);
                      cy.wait(1500);
                      P1.whatspp();
                      cy.wait(1500);
                      P1.savee();
                      cy.wait(1500);
                      P1.profilepreview();
                      console.log('value[2]',value[2]);
                      conditionMet=true;
                      console.log('con',conditionMet);
                      
                    })
                  }
                  
                });
              }else{
                cy.log('This user is already present.')
                cy.get('button[class="chakra-button css-ez23ye"]').click();
                P1.profilepreview();
                conditionMet=true;
                }
              }
              )
            }
            else{
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
                  })
                  }
              }
            }
              //Validation
              let condition=false;
              for(let i=1;i<rowLength;i++){
              const value=jsonData[0].data[i];
              if(condition){
                break;
              }
              if(value[2]){
                const P1 = new Elements();
                cy.wait(2000);
                P1.emergencycontacts();
                cy.wait(2000);
                const name=value[2];
                const na=name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
                console.log('na',na)
                cy.contains(na).should('exist');
                cy.wait(2000);
                condition=true;
                P1.profilepreview();
                }

                else{
                    const P1 = new Elements();
                    cy.wait(2000);
                    P1.emergencycontacts();
                    cy.wait(2000);
                    if(value[3]!==null && value[3]!==undefined &&
                       value[4]!==null && value[4]!==undefined &&
                       value[5]!==null && value[5]!==undefined ){
                        cy.contains(value[3]).should('exist');
                      }
                      cy.wait(2000);
                      P1.profilepreview();
                    }
                  }
                    
  });
});
});
