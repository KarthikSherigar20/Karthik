import login from "../../support/login";

describe('textfields',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

it('textfields',()=>{
    cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(1).click();

    cy.wait(500)

    const tf='.custominput_input__AQGtC ';

    cy.get(tf).then((len)=>{
        const le=len.length;
        cy.log('len',le)

    })
    cy.get(tf).each((tff)=>{
        cy.wrap(tff).clear().
        type('1234').should('have.value','1234').
        clear();
    })
})
})