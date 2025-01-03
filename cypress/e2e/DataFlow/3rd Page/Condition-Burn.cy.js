import login, { isWorkInProgress } from "../../../support/login";

describe('Assement results-Burn.cy',()=>{
    before(()=>{
        cy.wrap((null)).then(()=>{
            login()
        }).then(()=>{
            cy.log('Login completed')
        })
    })
    it('Assement results-Burn.cy',()=>{
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            if(bodyText.includes('New')){
                cy.contains('New').click();
                cy.wait(1500);
                cy.get('input[class="radioButton_radio__Dmg-B"]').eq(3).scrollIntoView().click();
                cy.wait(1500);
                cy.get('input[class="radioButton_radio__Dmg-B"]').eq(7).scrollIntoView().click();
                cy.wait(1500);
                cy.get('div[class="ant-select-selector"]').scrollIntoView().click();
                cy.wait(1500);
                cy.get('div[class="ant-select-item-option-content"]').eq(3).click();
                cy.wait(1500);
                cy.get('div[class="ant-select-selector"]').scrollIntoView().click();
                cy.wait(1500);
                cy.contains('Save Assessment').scrollIntoView().click();
                cy.wait(1500);
                cy.get('input[type="radio"]').eq(0).click();
                cy.wait(1500);
                cy.get('input[type="radio"]').eq(0).click();
                cy.wait(1500);
                cy.contains('Start Emergency').click();
                cy.wait(1500);
                cy.get('img[class="icon undefined"]').eq(5).click();
                cy.wait(1500);
                cy.get('p[class="text assessmentResult_ans__WOIlg"]').eq(0).invoke('text').then((text)=>{
                    expect(text.toLowerCase()).to.include('Burn'.toLowerCase());
                })
                cy.wait(1000);
                cy.get('img[class="icon undefined"]').eq(5).click();
                cy.wait(1000);
                cy.contains('Emergency Resolved').scrollIntoView().click();
                cy.wait(2000);
                    }
                })
    })
})