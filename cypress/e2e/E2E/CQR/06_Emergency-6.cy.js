import Num from "../../../fixtures/Number.json";
import login3 from "../../../support/login3-cqr";

describe('CQR-Ambulance-No',()=>{
    before(()=>{
        cy.wrap((null)).then(()=>{
            login3()
        }).then(()=>{
            cy.log('Login completed')
        })
    })
    it('Ambulance-No',()=>{
            cy.get('body').then(($bodyText)=>{
                const bodyText=$bodyText.text();
                if(bodyText.includes('New')){

            cy.contains('New').prevAll().eq(2).invoke('text').then((text)=>{
            const storedText=text;
            cy.contains('New').click();
            cy.wait(1500);
            cy.contains('By Mobile Number').scrollIntoView().click();
            cy.wait(2000);
            cy.get('input[placeholder="Enter Mobile No"]').type(Num.Numtosearch);
            cy.wait(2000);
            cy.contains('Search').click();
            cy.wait(3000);
            cy.get('label[class="radioButton_label__jC0Qn"]').eq(5).scrollIntoView().click();
            cy.wait(3000);
            cy.get('label[class="radioButton_label__jC0Qn"]').eq(10).scrollIntoView().click();
            cy.wait(1500);
            cy.get('input[name="isAmbulanceRequired"]').eq(1).click();
            cy.wait(3000);
            cy.contains('Start Emergency').scrollIntoView().click();
            // cy.wait(1500);
            // cy.get('input[type="radio"]').eq(0).click();
            // cy.wait(1500);
            // cy.get('input[type="radio"]').eq(1).click();
            // cy.wait(1500);
            // cy.contains('Start Emergency').click();
            cy.wait(2000);
            cy.get('body').should('contain','Doctor Consultation');
            cy.wait(1500);
            cy.get('.doctorConsult_input__iF2im').eq(0).type(Num.Doc);
            cy.wait(1500);
            cy.get('.doctorConsult_input__iF2im').eq(1).type(Num.Pat);
            cy.wait(1500);
            cy.contains(' Send Meeting Link').click();
            cy.wait(1500);
            cy.on('window:alert',(alertmsg)=>{
                expect(alertmsg).to.equal('MeetingLink Sent Successfully');
            })
            cy.get('input[placeholder="Doctor Name"]').type(Num.DocName);
            cy.wait(1500);
            cy.get('input[placeholder="Doctor Number"]').type(Num.Doc);
            cy.wait(1500);
            cy.contains('Share Patient’s Profile').click();
            cy.wait(1500);
            cy.get('body').should('contain','Patient details shared to doctor');
            cy.wait(1500);
            cy.contains('Send Ambulance Message').click();
            cy.wait(1500);
            cy.get('body').should('contain',' Ambulance Request Successfully Sent');
            cy.wait(1500);
            cy.contains('Ambulance Dispatched').scrollIntoView().click();
            cy.wait(1500);
            cy.get('body').should('contain',' Success');
            cy.wait(1500);
            cy.contains('Pickup Location').click();
            cy.wait(1500);
            cy.get('body').should('contain',' Success');
            cy.wait(1500);
            cy.contains('Pickup Patient').click();
            cy.wait(1500);
            cy.get('body').should('contain',' Success');
            cy.wait(1500);
            cy.contains('Patient Dropped').click();
            cy.wait(1500);
            cy.get('body').should('contain',' Success');
            cy.wait(1500);
            cy.contains('Emergency Resolved').click();
            cy.wait(1500);
            cy.contains(storedText).nextAll().eq(2).should('have.text','Completed');
        })
    }
    })
    })
})