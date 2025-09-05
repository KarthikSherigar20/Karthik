import login from "../../../support/login";

describe('Ambulance without email adress',()=>{
    beforeEach(()=>{
        login()
        cy.log('Login completed')
    })

    after(()=>{
        cy.reload();
        cy.wait(500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
    
    
            if(bodyText.includes('Test_Provider')){
                cy.contains('Test_Provider')
                .parent()
                .find('button')
                .contains('Del')
                .click();
            }
            cy.get('body').should('not.contain', 'Test_Provider');
        })

    })


it('Ambulanceprovider',()=>{
    cy.get('[class="chakra-icon css-6ey7w3"]').eq(8).scrollIntoView().click();

    cy.get('body').should('contain','Ambulance Provider').scrollIntoView();

    cy.wait(1000);

    cy.get('body').then(($bodyText)=>{
        const bodyText=$bodyText.text();


        if(bodyText.includes('Test_Provider')){
            cy.contains('Test_Provider')
            .parent()
            .find('button')
            .contains('Del')
            .click();
        }
        cy.get('body').should('not.contain', 'Test_Provider');
    })
    cy.wait(500);

    cy.get('input[placeholder="Enter service name"]').type('Test_Provider')

    cy.get('input[placeholder="Enter address line 1"]').type('Abcd 1244 gjfhe')

    cy.get('input[placeholder="Enter city"]').type('Bangalore')

    cy.get('input[placeholder="Enter state"]').type('Karnataka')

    cy.get('input[placeholder="Enter country"]').type('India')

    cy.get('#pinCode').type('560103');

    cy.get('input[placeholder="Enter contact number"]').scrollIntoView().type('8888888865');

    cy.contains('Next').click();

    cy.wait(1500);

    cy.get('body').should('contain','Test_Provider');
})

it('Ambulance RateCard',()=>{
    cy.get('[class="chakra-icon css-6ey7w3"]').eq(8).scrollIntoView().click();

    cy.get('body').should('contain','Ambulance Provider').scrollIntoView();

    cy.contains('Ambulance RateCard').click();

    cy.get('body').should('contain','Ambulance Provider Rate Card');

    cy.get('select[class="chakra-select css-161pkch"]').eq(0).select('Test_Provider');


    const Type = []; // Ensure this is defined before usage
    const vehicleNames=['EECO/Bolero','Tempo/Tata Winger','ALS-Tempo/Tata Winger','BLS-Tempo/Tata Winger']

    cy.get('select[class="chakra-select css-161pkch"]').eq(1)
    .find('option').each(($options)=>{
        const optionText=$options.text().trim();

        if(optionText !== 'Select Ambulance Type'){
            Type.push(optionText)
        }
    }).then(()=>{
        cy.log('Ambulance types: ',Type.join(' , '))
    })
    
    cy.wrap(Type).each((Types, index)=>{
        cy.get('select[class="chakra-select css-161pkch"]').eq(0).select('Test_Provider');
        cy.wait(500);
        
        cy.get('select[class="chakra-select css-161pkch"]').eq(1).select(Types);
        cy.wait(500);
        
        const vehicle= vehicleNames[index % vehicleNames.length];
        cy.wait(500);
        
        cy.get('input[placeholder="Enter vehicle type (e.g., EECO/Bolero)"]').type(vehicle);
        cy.wait(500);
        
        cy.get('input[placeholder="e.g., 0-5 km"]').type('0-5');
        cy.wait(500);
        
        cy.get('input[placeholder="Enter price"]').type('700');
        cy.wait(500);
        
        cy.contains('Add Rate Card').scrollIntoView().click();
        cy.wait(500);
        
        cy.get('input[placeholder="e.g., 0-5 km"]').eq(1).type('5-10');
        cy.wait(500);
        
        cy.get('input[placeholder="Enter price"]').eq(1).type('800');
        cy.wait(500);
        
        cy.contains('Add Rate Card').scrollIntoView().click();
        cy.wait(500);
        
        cy.get('input[placeholder="e.g., 0-5 km"]').eq(2).type('10-15');
        cy.wait(500);
        
        cy.get('input[placeholder="Enter price"]').eq(2).type('1200');
        cy.wait(500);
        
        cy.contains('Create').click();
        cy.wait(500);
    })
  })

  it('Adding ambulance cities',()=>{
    cy.get('[class="chakra-icon css-6ey7w3"]').eq(8).scrollIntoView().click();

    cy.get('body').should('contain','Ambulance Provider').scrollIntoView();

    cy.contains('Ambulance City').click();

    cy.wait(500);

    cy.get('select[class="chakra-select css-161pkch"]').eq(2).select('Test_Provider');

    const cities=['amravati','imphal','visakhapatnam','vijayawada','ghaziabad'];

    const State=['Andhra Pradesh','Manipur','Andhra Pradesh','Andhra Pradesh','Uttar Pradesh'];

    cities.forEach((city,index)=>{

        cy.wait(500);

        cy.get('input[placeholder="e.g Bangalore"]').each(($input) => {
            cy.wrap($input).invoke('val').then((text) => {
                if (!text) {  // If the field is empty
                    cy.wrap($input).type(city);
                }
            });
        });
        
        
        cy.wait(500);
        
        cy.get('div[class=" css-1jqq78o-placeholder"]').click({force:true});
        
        cy.contains(State[index]).click();

        if(index < cities.length-1){
            cy.contains('Add City').click();
        }
    })
    cy.get('button[class="chakra-button css-1t8s8ud"]').eq(1).click();
    cy.wait(500);
    cy.reload();
    cy.wait(500);
    cy.contains('Ambulance City').click();

    cy.wait(500);

    cy.get('select[class="chakra-select css-161pkch"]').eq(2).select('Test_Provider');

        cy.wait(1500);

        State.forEach((st,index)=>{
            cy.get('body').should('contain',st);
        })
  })

})