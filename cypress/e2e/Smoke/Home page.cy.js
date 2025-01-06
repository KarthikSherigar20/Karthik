import login from "../../support/login";

describe('Homepage',()=>{
    before(()=>{
        cy.wrap(null).then(()=>{
            login();
        }).then(()=>{
            cy.log('Login completed');
        })
    })
    it('Buttons',()=>{
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(0).click();
        cy.wait( 500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('Dashboard');
        })
        cy.wait( 500);
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(1).click();
        cy.wait( 500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('Get Ben Data By Filter Data');
        })
        
        cy.wait( 500);
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(2).click();
        cy.wait( 500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('Manage User Data');
        })
        cy.wait( 500);
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(3).click();
        cy.wait( 500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('Task Name');
        })
        cy.wait( 500);
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(4).click();
        cy.wait( 500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('Create Job');
        })
        cy.wait( 500);
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(5).click();
        cy.wait( 500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('Send Email');
        })
        cy.wait( 500);
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(6).click();
        cy.wait( 500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('Whatsapp Job List');
        })
        cy.wait( 500);
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(7).click();
        cy.wait( 500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('Beneficiary Having No Hospital Dashboard Details');
        })
        cy.wait( 500);
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(8).click();
        cy.wait( 500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('Manage Company');
        })
        cy.wait( 500);
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(9).click();
        cy.wait( 500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('Ambulance Provider');
        })
        cy.wait( 500);
        cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(10).click();
        cy.wait( 500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            expect(bodyText).to.contain('Admin Login');
        })


    })

})
