import login from "../../support/login";

describe('Checkbox',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

it('Checkbox',()=>{
    cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(1).click();

    cy.wait(500);

    const chec='input[class="checkbox_inputStyle__Rjg8M"]';

    cy.get(chec).each((check, index) => {
        // Scroll into view and click to check
        cy.wrap(check).scrollIntoView().then(($checkbox)=>{

            if($checkbox.is(':checked')){

                cy.get(chec).eq(index)
                .click();
                
                // Assert that the checkbox is checked
                cy.get(chec).eq(index)
                .should('not.be.checked');
                
                // Re-query the checkbox (breaking the chain)
                cy.get(chec).eq(index)
                .click();
                
                // Assert that the checkbox is unchecked
                cy.get(chec).eq(index)
                .should('be.checked');
            }else{
                cy.get(chec).eq(index)
                .click();
                // Assert that the checkbox is checked
                cy.get(chec).eq(index)
                .should('be.checked');
                
                // Re-query the checkbox (breaking the chain)
                cy.get(chec).eq(index)
                .click();
                
                // Assert that the checkbox is unchecked
                cy.get(chec).eq(index)
                .should('not.be.checked');

            }
        })
    });
  })
})