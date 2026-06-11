describe('Pococare Customer App - Add Beneficiary Flow', () => {
  it('should login, add beneficiary, and fill basic info and address', () => {
    // 1. Go to the customer app
    cy.visit('https://pococustomerapp.stage.pococare.com/customer');

    // 2. Enter email and request OTP
    cy.get('input[placeholder="Email"]').type('playstoretest@pococare.com');
    cy.contains('button', 'Get OTP').click();

    // 3. Enter OTP (123456)
    cy.get('input[aria-label="Please enter OTP character 1"]').type('1');
    cy.get('input[aria-label="Please enter OTP character 2"]').type('2');
    cy.get('input[aria-label="Please enter OTP character 3"]').type('3');
    cy.get('input[aria-label="Please enter OTP character 4"]').type('4');
    cy.get('input[aria-label="Please enter OTP character 5"]').type('5');
    cy.get('input[aria-label="Please enter OTP character 6"]').type('6');
    cy.contains('button', 'Verify').click();

    // 4. Add Beneficiary
    cy.contains('button', 'Add Beneficiary').click();
    cy.contains('li', 'Create New').click();

    // 5. Fill Add Beneficiary form with dummy data
    cy.get('input[placeholder="Full name"]').type('John Doe');
    cy.get('select').select('Brother');
    cy.get('input[placeholder="00000-00000"]').type('9876543210');
    cy.get('input[placeholder="City"]').type('Bangalore');
    cy.get('input[aria-label="Pincode"]').type('560001');
    cy.contains('button', 'Add').click();

    // 6. Complete Profile for the new beneficiary
    cy.contains('.ant-card', 'JOHN DOE').within(() => {
      cy.contains('button', 'Complete Profile').click();
    });

    // 7. Fill Basic Information section
    cy.get('select').eq(1).select('Male');
    cy.get('input[aria-label="Age"]').type('30');
    cy.get('input[placeholder="Email"]').type('johndoe@email.com');
    cy.get('input[placeholder="Whatsapp Number"]').type('9876543210');
    cy.contains('button', 'Save and continue').click();

    // 8. Edit Address section
    cy.contains('Address').click();
    cy.get('.Address_greenIcon__55QWv').first().click();
    cy.get('input[placeholder="Enter Label"]').type('Home');
    cy.get('input[placeholder="Flat No. / House No. / Building / Company / Apartment"]').type('123A');
    cy.get('input[placeholder="Area, Street, Sector, Village"]').type('MG Road');
    cy.get('input[placeholder="Landmark"]').type('Near Metro Station');
    cy.get('input[placeholder="State"]').type('Karnataka');
    cy.contains('button', 'Save Changes').click();

    // You can continue with the other sections similarly...
  });
});