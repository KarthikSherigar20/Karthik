import url from '../../../fixtures/urls.json';
import un from '../../../fixtures/UN&PASS';
import Elements from '../../../Objects/Elements';

describe('View Profile',()=>{
    it('Checking Viw Profile',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];
        cy.visit(selectUrl);
        const P1=new Elements();
        cy.wait(1500);
        cy.contains('Login').click();
        cy.wait(1500);
        cy.get('input[id="email"]').type(un.Un);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
        cy.wait(3500);
        P1.PTA();
        cy.wait(1000);
        P1.OTP();
        cy.wait(1000);
        cy.contains('Verify').click();
        cy.wait(1500);
        cy.get('path[d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z"]')
        .scrollIntoView().should('not.be.disabled').click({force:true});
        cy.wait(1500);
        cy.get('input[class="chakra-input css-1cjy4zv"]').eq(0).should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.get('select[class="chakra-select css-161pkch"]').then((dropdown)=>{
            const previousselectoption=dropdown.val();
        cy.get('select[class="chakra-select css-161pkch"] option').then((Options)=>{
            const actual=[...Options].map(Option=>Option.value);
            for(let i=0;i<actual.length;i++){
                cy.get('select[class="chakra-select css-161pkch"]').select(actual[i]).should('have.value',actual[i]);
                cy.wait(500);
            }
        });cy.get('select[class="chakra-select css-161pkch"]').select(previousselectoption).should('have.value',previousselectoption);
        })
        cy.wait(1000);
        cy.get('input[placeholder="00000-00000"]').should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.get('input[class="chakra-input css-1cjy4zv"]').eq(1).should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.get('input[class="chakra-input css-1cjy4zv"]').eq(2).should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.contains('Add').should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.contains('Cancel').should('be.visible').should('not.be.disabled');
        cy.wait(1000);
        cy.get('svg[class="chakra-icon css-onkibi"]').should('be.visible').should('not.be.disabled');
    })
})