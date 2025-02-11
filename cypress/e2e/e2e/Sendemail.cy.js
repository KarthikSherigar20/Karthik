import login from "../../support/login";
import Email from '../../fixtures/Email&no.json';


describe('Sendemail',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

it('Sendemail',()=>{
    cy.get('[class="chakra-icon css-6ey7w3"]').eq(5).scrollIntoView().click();

    cy.get('body').should('contain','Send Email')

    cy.contains('Create Job').scrollIntoView().click()

    cy.get('input[type="text"]').type('Test')

    cy.get('button[type="button"]').eq(2).click();

    cy.contains('New').click();

    cy.contains('Add Beneficiary').click();

    const email=Email.Email;

    cy.get('input[placeholder="Enter email"]').type(email);

    cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).click();

    function addall(){
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text()

            if(bodyText.includes('Add All Ben To Job')){
                cy.contains('Add All Ben To Job').click()
            }else{
                cy.wait(1000)
                addall()
            }
        })
    }
    addall()
    cy.wait(2000);

    const buttons=['Send Email','Send To Subscriber']

    buttons.forEach((button)=>{
        cy.contains(button).should('be.disabled');
    })

    cy.contains('option','Select Template').click({force:true})


    cy.get('select[class="chakra-select css-161pkch"]').select('Poco EmUrgency App Update');

    buttons.forEach((bu)=>{
        cy.contains(bu).should('not.be.disabled')
    })

    cy.contains('Send Email').click()

    cy.wait(1000);

    buttons.forEach((button)=>{
        cy.contains(button).should('be.disabled');
    })
  })
})