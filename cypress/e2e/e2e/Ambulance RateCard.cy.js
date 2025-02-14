import login from "../../support/login";

describe('Ambulance RateCard',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

it('Ambulance RateCard',()=>{
    cy.get('[class="chakra-icon css-6ey7w3"]').eq(9).scrollIntoView().click();

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

        cy.get('select[class="chakra-select css-161pkch"]').eq(1).select(Types);

        const vehicle= vehicleNames[index % vehicleNames.length];

        cy.get('input[placeholder="Enter vehicle type (e.g., EECO/Bolero)"]').type(vehicle);

        cy.get('input[placeholder="e.g., 0-5 km"]').type('0-5');

        cy.get('input[placeholder="Enter price"]').type('700');

        cy.contains('Add Rate Card').scrollIntoView().click();

        cy.get('input[placeholder="e.g., 0-5 km"]').eq(1).type('5-10');

        cy.get('input[placeholder="Enter price"]').eq(1).type('900');

        cy.contains('Add Rate Card').scrollIntoView().click();

        cy.get('input[placeholder="e.g., 0-5 km"]').eq(2).type('10-15');

        cy.get('input[placeholder="Enter price"]').eq(2).type('1200');

        cy.contains('Create').click();
    })
  })
})