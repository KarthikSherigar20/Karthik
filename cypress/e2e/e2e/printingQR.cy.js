import login from "../../support/login";

describe('QRP',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

it('QR',()=>{
    cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(3).scrollIntoView().click();

    cy.contains('Create Job').click();

    cy.get('input[placeholder="Job Name"]').type('test')

    cy.get('textarea[placeholder="Description"]').type('description')

    cy.get('button[type="button"]').eq(3).click({force:true});

    const date = new Date();

    // Format the date and time
    const formattedDate = date.toLocaleString('en-GB', {
        day: '2-digit',    // Two-digit day (e.g., 30)
        month: '2-digit',  // Two-digit month (e.g., 01)
        year: 'numeric',   // Full year (e.g., 2025)
        hour: '2-digit',   // Two-digit hour (e.g., 03)
        minute: '2-digit', // Two-digit minute (e.g., 28)
        hour12: true       // Use 12-hour format (e.g., 03:28 PM)
    });
    
    cy.log('Formatted Date: ', formattedDate);

    cy.contains(formattedDate).nextAll().eq(1).then((da)=>{
        const text=da.text();
        expect(text).to.contain('New')
    })
    
    cy.contains(formattedDate).click();

    // cy.contains('New').click();

    cy.contains('Add Records').click();

    cy.contains('option','Select Company').click({force:true});

    cy.get('select[class="CustomSelect_select_border__lWd7w"]').select('Pococare')

    cy.contains('button','Search').scrollIntoView().click();

    function checkAndClickButton() {
        cy.get('body').then(($bodyText) => {
            const bodyText = $bodyText.text();
    
            if (bodyText.includes('Add All Ben To Job')) { // Use `.includes()` instead of `.contains()`
                cy.contains('button', 'Add All Ben To Job').click();
            } else {
                cy.wait(1000);
                checkAndClickButton(); // Recursively call the function
            }
        });
    }
    
    // Call the function initially
    checkAndClickButton();
    
    function submit(){
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();

            if(bodyText.includes('Submit')){
                cy.contains('Submit').click()
            }else{
                cy.wait(1000);
                submit();
            }
        })
    }
    submit();

    cy.get('button[class="chakra-button css-41aesz"]').click();

    cy.get('body').should('contain','Print QR')

    cy.contains('Print QR').click();

    cy.get('body').should('contain','Print QR Codes');





})
})