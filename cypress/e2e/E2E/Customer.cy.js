import Elements from "../../Objects/Elements";
const url = require('../../fixtures/urls.json');

describe('Customer login', () => {
    before(() => {
        cy.parseXlsx('cypress/Excels/Insurance information.xlsx').then((jsonData) => {
            const rowLength = Cypress.$(jsonData[0].data).length;
            cy.log(rowLength);
            const firstRow = jsonData[0].data[1]; // Assuming the login details are in the first row 

            const selectedEnvironment = url.selectedEnvironment;
            const selectUrl = url.environments[selectedEnvironment];

            cy.visit(selectUrl);  //Mention urlname: Dev or Stage or Prod

            const P1 = new Elements();
            // P1.loginbtn();
            P1.email(firstRow[0]); // Assuming email is in the first column
            P1.sendotp();
            cy.wait(3500);
            P1.PTA();
            cy.wait(1000);
            P1.OTP();
            cy.wait(1000);
            P1.verify();
        });
    });
    it('E@E', () => {
        const P1 = new Elements();
        P1.Addben();
        cy.wait(1500);
        cy.get('input#chakra-input css-1cjy4zv').type('Test');
        cy.wait(500);
        cy.get('select[id="field-:r1a:"]').select('Others');
        cy.wait(500);
        cy.get('input[placeholder="00000-00000"]').type('8888885896');
        cy.wait(500);
        cy.get('#field-:r1c:').type('Bangalore');
        cy.wait(500);
        cy.get('#field-:r1d:').type('560103');
        cy.wait(500);


    })

})
