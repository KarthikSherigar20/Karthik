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

    })

})