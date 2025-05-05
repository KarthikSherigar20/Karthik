import login from "../../support/login";

describe('whatsappresponse',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

it('whatsappresponse',()=>{
    cy.get('[class="chakra-icon css-6ey7w3"]').eq(6).scrollIntoView().click();

    cy.contains('send').click()

    cy.get('body').should('contain','whatsappMsgId')

    cy.get('body').then(($bodyText)=>{
        const bodyText=$bodyText.text()
        if(bodyText.includes('N/A')){
            cy.get('body').should('contain','N/A')

            cy.get('body').should('contain','Get deliveryStatus');
        
            cy.contains('Get deliveryStatus').scrollIntoView().click();
        
            cy.contains('Success').eq(0).next().should('not.contain','N/A');

        }else{
            cy.contains('Success').eq(0).next().invoke('text').should('match',/DELIVERED|Failed|ACCEPTED|IN_PROGRESS|READ/i);

        }
    })
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text()

            if(bodyText.includes('Failed')){

                cy.log("1");
                cy.get('body').should('contain','Resend All Failed Messages');

                cy.contains('Resend All Failed Messages').scrollIntoView().click();
                cy.wait(500);
                // cy.get('body').should('not.contain','Resend All Failed Messages')
                cy.wait(500);

                // cy.get('body').should('contain','N/A')

                cy.get('body').should('contain','Get deliveryStatus');
            
                cy.contains('Get deliveryStatus').scrollIntoView().click();
            
                cy.contains('Success').eq(0).next().should('not.contain','N/A');

            }
     })
  })
})