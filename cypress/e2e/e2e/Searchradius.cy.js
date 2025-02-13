import login from "../../support/login";

describe('Searchradius',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

it('Searchradius',()=>{
    cy.get('[class="chakra-icon css-6ey7w3"]').eq(7).scrollIntoView().click();

    cy.get('body').should('contain','Beneficiary Having No Hospital Dashboard Details').scrollIntoView();

    cy.get('select[id="hospital-select"]').select('Pococare');

    cy.get('input[type="number"]').type('5');

    cy.contains('Search').click();

    function BenID(){
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();

            if(bodyText.includes('BenID')){
                expect(bodyText).to.include('BenID');

            }else{
                cy.wait(1000);
                BenID()
            }
        })
    }
    BenID();
})
})