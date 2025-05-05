import login from "../../support/login";
import mob from "../../fixtures/Email&no.json"

describe('Whatsapp',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

it('Whatsapp',()=>{
    cy.get('[class="chakra-icon css-6ey7w3"]').eq(4).scrollIntoView().click();

    cy.contains('Create Job').scrollIntoView().click()

    cy.get('.custominput_input__AQGtC').type('Test')

    cy.contains('Save Job').click()

    cy.contains('pending').click()

    cy.get('select[class="chakra-select css-161pkch"]').select('WA_ADD_EC_1');

    cy.contains('Select Ben').click();

    const mo=mob.Mobno;

    cy.get('[placeholder="Enter PhoneNumber"]').scrollIntoView().type(mo)

    cy.get('button[class="BenAddressData_button__0kXLn"]').eq(1).click();

    cy.wait(1000);

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
    addall();

    cy.wait(5000);

    cy.get('body').then(($bodyText)=>{
        const bodyText=$bodyText.text();

        if(bodyText.includes('Clear All Invalid Ben')){
            cy.wait(1000);
            cy.contains('Clear All Invalid Ben').scrollIntoView().click();
        }else{
            cy.log('There is no Clear All invalid ben button');
        }
    })
    cy.wait(3000);
    function Send(){
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text()

            if(bodyText.includes('Send Wa Message')){
                cy.contains('Send Wa Message').click()
            }else{
                cy.wait(1000)
                Send()
            }
        })

    }
    Send();

    cy.on('window:alert',(alertText)=>{
        expect(alertText).to.equal('message sent to all beneficiaries')
    })

    cy.contains('Send Wa Message').should('be.disabled');






})
})