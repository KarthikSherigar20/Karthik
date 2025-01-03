import login, { isWorkInProgress } from "../../../support/login";

describe('Assement results-Condition-Accident.cy',()=>{
    before(()=>{
        cy.wrap((null)).then(()=>{
            login()
        }).then(()=>{
            cy.log('Login completed')
        })
    })
    it('Assement results-Condition-Accident.cy',()=>{
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            if(bodyText.includes('New')){
                cy.contains('New').click();
                cy.wait(1500);
                cy.get('input[class="radioButton_radio__Dmg-B"]').eq(3).scrollIntoView().click();
                cy.wait(1500);
                cy.get('div[class="ant-select-selector"]').scrollIntoView().click();
                cy.wait(1500);
                cy.get('div[class="ant-select-item-option-content"]').eq(0).click();
                cy.wait(1500);
                cy.get('div[class="ant-select-selector"]').scrollIntoView().click();
                cy.wait(1500);
                cy.get('span[aria-live="polite"]').invoke('text').then((text)=>{
                    expect(text.toLowerCase()).to.include('Accident'.toLowerCase())
                })
                    }
                })
    })
})