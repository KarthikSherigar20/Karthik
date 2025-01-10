import login from "../../../support/login";

describe('Ticketdashboard',()=>{
    before(()=>{
        cy.wrap(null).then(()=>{
            login();
        }).then(()=>{
            cy.log('Login completed')
        })
    })

    it('Ticket dashboard',()=>{
        cy.contains('Ticket Dashboard Details').click();

       const expectedTexts=['Company Name','Ticket Status','Count','Date Filter']

        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
        expectedTexts.forEach((text)=>{
            expect(bodyText).to.contain(text);
        })
        })


    })
})