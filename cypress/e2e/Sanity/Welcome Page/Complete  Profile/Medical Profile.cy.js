import url from '../../../../fixtures/urls.json';
import un from '../../../../fixtures/UN&PASS.json';

describe('Basic information',()=>{
    it('Checking Basic information page',()=>{
        const selectedEnvironment=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironment];

        cy.visit(selectUrl);
        cy.wait(1500);
        cy.contains('Login').click();
        cy.wait(1500);
        cy.get('input[id="email"]').type(un.Un);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
        cy.wait(10000);
        cy.contains('Verify').click();
        cy.wait(1500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            if(bodyText.includes('Edit Profile')){
                cy.contains('Edit Profile').click();
            }else{
            cy.contains('Complete Profile').eq(0).click();
            }
        })
        cy.contains('Medical Profile').click();
        cy.wait(1500);
        cy.get('div[class="dropdown-heading-value"]').click();
        cy.wait(1500);

        const cronic=["Type 2 Diabetics Mellitus","HyperTension","Heart Disease","Cancer","Chronic Kidney Disease","Asthma",
                "Hyperlipidemia","Dialysis","Others"]

        cy.get('.dropdown-heading-value > span').invoke('text').then((text)=>{
            const childtext=text.trim();
            cy.log('childtext',childtext);
            if(childtext==='Select...'){
                cronic.forEach(condition => {
                    cy.contains(condition).scrollIntoView().should('be.visible').should('not.be.disabled').click();
                    cy.wait(500);
                    cy.get('div[class="dropdown-heading-value"]').click();
                    cy.wait(500);
                    cy.get('button[class="clear-selected-button"]').click();
                    cy.wait(500);
                    if(cronic[8] !== condition){
                        cy.get('div[class="dropdown-heading-value"]').click();
                    }
                })
            }else{
                cy.get('button[class="clear-selected-button"]').click();
                cy.wait(500);
                cy.get('div[class="dropdown-heading-value"]').click();
            cronic.forEach(condition => {
                cy.contains(condition).scrollIntoView().should('be.visible').should('not.be.disabled').click();
                cy.wait(500);
                cy.get('div[class="dropdown-heading-value"]').click();
                cy.wait(500);
                cy.get('button[class="clear-selected-button"]').click();
                cy.wait(500);
                if(cronic[8] !== condition){
                    cy.get('div[class="dropdown-heading-value"]').click();
                }
            })
            }
            cy.wait(1000);
            cy.get('div[class="dropdown-heading-value"]').click();
            cronic.forEach(condition=>{
                cy.contains(condition).scrollIntoView().click();
                cy.wait(500);
            })
            cy.get('button[class="clear-selected-button"]').click();
            if (childtext !== 'Select...') {
                const conditions = childtext.split(','); // Splitting by comma if present
            
                conditions.forEach(condition => {
                    const trimmedCondition = condition.trim(); // Trim any leading or trailing whitespace
                    console.log('trimmedcond',trimmedCondition);
                    if (trimmedCondition) { // Check if condition is not empty after trimming
                        cy.get('div[class="dropdown-heading-value"]').click();
                        cy.contains(trimmedCondition, {matchCase:false}).click();
                        cy.get('div[class="dropdown-heading-value"]').click();
                    }
                });
            }
        });
        const bloddgrp='select[class="chakra-select css-161pkch"]';
        cy.get(bloddgrp).eq(0).then((dropdown)=>{
            const previouslySelectedOption=dropdown.val();
        cy.get(bloddgrp).eq(0).find('option').then((Options)=>{
            const actual=[...Options].map(o=>o.value)
         for(let i=0;i<actual.length;i++){
            cy.get(bloddgrp).eq(0).select(actual[i]).should('have.value',actual[i]).should('be.visible').should('not.be.disabled');
            cy.wait(500);
         }
        })
        cy.get(bloddgrp).eq(0).select(previouslySelectedOption);
        })
        const Yes='';
        cy.get('div[class="chakra-radio-group css-0"]').eq(0)
        .find('input[type="radio"]')
        .each(($radioButton) => {
                if ($radioButton.prop('checked')) {
                    // This radio button is already checked
                    const radioButtonValue = $radioButton.val(); // Assuming value attribute stores the value of the radio button
                    cy.log(`Radio button with value ${radioButtonValue} is already checked.`);
                    cy.log('radioButtonValue',radioButtonValue);
                    if(radioButtonValue==='Yes'){
                    cy.get('textarea[placeholder="Provide Description of Medicines"]').should('be.visible').should('not.be.disabled')
                    cy.wait(1000);
                    cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(0).should('be.visible')
                    .should('not.be.disabled');
                    cy.get('body').then(($bodyText)=>{
                        const bodyText=$bodyText.text();
                        if(bodyText.includes('Upload Document')){
                            cy.contains('Upload Document').should('be.visible').should('not.be.disabled');
                        }else{
                            cy.contains('View Document').should('be.visible').should('not.be.disabled');
                        }
                    })
                    }else{
                        cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(0).should('be.visible')
                       .should('not.be.disabled');
                       cy.wait(1000);
                       cy.get('span[class="chakra-radio__control css-134kubt"]').eq(0).should('be.visible')
                       .should('not.be.disabled').click();
                       cy.wait(1000);
                       cy.get('textarea[placeholder="Provide Description of Medicines"]').should('be.visible').should('not.be.disabled')
                       .click();
                       cy.wait(1500);
                       cy.contains('Upload Document').should('be.visible').should('not.be.disabled');
                       cy.wait(1500);
                       cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(0).scrollIntoView().should('be.visible')
                       .should('not.be.disabled').click();
                    }
                }else{
                    cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(0).should('be.visible')
                       .should('not.be.disabled');
                    cy.wait(1500);
                    cy.get('span[class="chakra-radio__control css-134kubt"]').eq(0).should('be.visible')
                       .should('not.be.disabled');
                    cy.get('body').then((bodyElement)=>{
                        const bodyText=bodyElement.text();
                        cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(0).next().invoke('text').then((tex)=>{
                            cy.log('tex',tex);
                            expect(bodyText).to.contain(tex);
                        })
                        cy.get('span[class="chakra-radio__control css-134kubt"]').eq(0).next().invoke('text').then((tex)=>{
                            cy.log('tex',tex);
                            expect(bodyText).to.contain(tex);
                        })
                    })

                }
            });
            cy.get('div[class="chakra-radio-group css-0"]').eq(1)
        .find('input[type="radio"]')
        .each(($radioButton) => {
                if ($radioButton.prop('checked')) {
                    // This radio button is already checked
                    const radioButtonValue = $radioButton.val(); // Assuming value attribute stores the value of the radio button
                    cy.log(`Radio button with value ${radioButtonValue} is already checked.`);
                    cy.log('radioButtonValue',radioButtonValue);
                    if(radioButtonValue==='Yes'){
                    cy.get('textarea[placeholder="Provide details of Medicines Allergies"]').should('be.visible').should('not.be.disabled')
                    cy.wait(1000);
                    cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(1).should('be.visible')
                    .should('not.be.disabled');
                    }else{
                        cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(1).should('be.visible')
                       .should('not.be.disabled');
                       cy.wait(1000);
                       cy.get('span[class="chakra-radio__control css-134kubt"]').eq(1).should('be.visible')
                       .should('not.be.disabled').click();
                       cy.wait(1000);
                       cy.get('textarea[placeholder="Provide details of Medicines Allergies"]').should('be.visible').should('not.be.disabled')
                       .click();
                       cy.wait(1500);
                       cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(1).should('be.visible')
                       .should('not.be.disabled').click();
                    }
                }else{
                    cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(1).should('be.visible')
                       .should('not.be.disabled');
                    cy.wait(1500);
                    cy.get('span[class="chakra-radio__control css-134kubt"]').eq(1).should('be.visible')
                       .should('not.be.disabled');
                    cy.get('body').then((bodyElement)=>{
                        const bodyText=bodyElement.text();
                        cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(1).next().invoke('text').then((tex)=>{
                            cy.log('tex',tex);
                            expect(bodyText).to.contain(tex);
                        })
                        cy.get('span[class="chakra-radio__control css-134kubt"]').eq(1).next().invoke('text').then((tex)=>{
                            cy.log('tex',tex);
                            expect(bodyText).to.contain(tex);
                        })
                    })

                }
            });
            cy.get('div[class="chakra-radio-group css-0"]').eq(2)
            .find('input[type="radio"]')
            .each(($radioButton) => {
                    if ($radioButton.prop('checked')) {
                        // This radio button is already checked
                        const radioButtonValue = $radioButton.val(); // Assuming value attribute stores the value of the radio button
                        cy.log(`Radio button with value ${radioButtonValue} is already checked.`);
                        cy.log('radioButtonValue',radioButtonValue);
                        if(radioButtonValue==='Yes'){
                        cy.get('textarea[placeholder="Provide Description of Medical and Surgical History"]').should('be.visible').should('not.be.disabled')
                        cy.wait(1000);
                        cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(2).should('be.visible')
                        .should('not.be.disabled');
                        cy.get('body').then(($bodyText)=>{
                            const bodyText=$bodyText.text();
                            if(bodyText.includes('Upload Document')){
                                cy.contains('Upload Document').should('be.visible').should('not.be.disabled');
                            }else{
                                cy.contains('View Document').should('be.visible').should('not.be.disabled');
                            }
                        })
                        }else{
                            cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(2).should('be.visible')
                           .should('not.be.disabled');
                           cy.wait(1000);
                           cy.get('span[class="chakra-radio__control css-134kubt"]').eq(2).should('be.visible')
                           .should('not.be.disabled').click();
                           cy.wait(1000);
                           cy.get('textarea[placeholder="Provide Description of Medical and Surgical History"]').should('be.visible').should('not.be.disabled')
                           .click();
                           cy.wait(1500);
                           cy.contains('Upload Document').should('be.visible').should('not.be.disabled');
                           cy.wait(1500);
                           cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(2).scrollIntoView().should('be.visible')
                           .should('not.be.disabled').click();
                        }
                    }else{
                        cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(2).should('be.visible')
                           .should('not.be.disabled');
                        cy.wait(1500);
                        cy.get('span[class="chakra-radio__control css-134kubt"]').eq(2).should('be.visible')
                           .should('not.be.disabled');
                        cy.get('body').then((bodyElement)=>{
                            const bodyText=bodyElement.text();
                            cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(2).next().invoke('text').then((tex)=>{
                                cy.log('tex',tex);
                                expect(bodyText).to.contain(tex);
                            })
                            cy.get('span[class="chakra-radio__control css-134kubt"]').eq(2).next().invoke('text').then((tex)=>{
                                cy.log('tex',tex);
                                expect(bodyText).to.contain(tex);
                            })
                        })
    
                    }
                });
                cy.get('div[class="chakra-radio-group css-0"]').eq(3)
                .find('input[type="radio"]')
                .each(($radioButton) => {
                        if ($radioButton.prop('checked')) {
                            // This radio button is already checked
                            const radioButtonValue = $radioButton.val(); // Assuming value attribute stores the value of the radio button
                            cy.log(`Radio button with value ${radioButtonValue} is already checked.`);
                            cy.log('radioButtonValue',radioButtonValue);
                            if(radioButtonValue==='Yes'){
                            cy.get('textarea[placeholder="Provide Description of Recent Hospitalization Description"]').scrollIntoView().should('be.visible').should('not.be.disabled')
                            cy.wait(1000);
                            cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(3).should('be.visible')
                            .should('not.be.disabled');
                            cy.get('body').then(($bodyText)=>{
                                const bodyText=$bodyText.text();
                                if(bodyText.includes('Upload Document')){
                                    cy.contains('Upload Document').scrollIntoView().should('be.visible').should('not.be.disabled');
                                }else{
                                    cy.contains('View Document').scrollIntoView().should('be.visible').should('not.be.disabled');
                                }
                            })
                            }else{
                                cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(3).should('be.visible')
                               .should('not.be.disabled');
                               cy.wait(1000);
                               cy.get('span[class="chakra-radio__control css-134kubt"]').eq(3).should('be.visible')
                               .should('not.be.disabled').click();
                               cy.wait(1000);
                               cy.get('textarea[placeholder="Provide Description of Recent Hospitalization Description"]').should('be.visible').should('not.be.disabled')
                               .click();
                               cy.wait(1500);
                               cy.contains('Upload Document').should('be.visible').should('not.be.disabled');
                               cy.wait(1500);
                               cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(3).scrollIntoView().should('be.visible')
                               .should('not.be.disabled').click();
                            }
                        }else{
                            cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(3).should('be.visible')
                               .should('not.be.disabled');
                            cy.wait(1500);
                            cy.get('span[class="chakra-radio__control css-134kubt"]').eq(3).should('be.visible')
                               .should('not.be.disabled');
                            cy.get('body').then((bodyElement)=>{
                                const bodyText=bodyElement.text();
                                cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(3).next().invoke('text').then((tex)=>{
                                    cy.log('tex',tex);
                                    expect(bodyText).to.contain(tex);
                                })
                                cy.get('span[class="chakra-radio__control css-134kubt"]').eq(3).next().invoke('text').then((tex)=>{
                                    cy.log('tex',tex);
                                    expect(bodyText).to.contain(tex);
                                })
                            })
        
                        }
                    });
                    cy.get('div[class="chakra-radio-group css-0"]').eq(4)
                    .find('input[type="radio"]')
                    .each(($radioButton) => {
                            if ($radioButton.prop('checked')) {
                                // This radio button is already checked
                                const radioButtonValue = $radioButton.val(); // Assuming value attribute stores the value of the radio button
                                cy.log(`Radio button with value ${radioButtonValue} is already checked.`);
                                cy.log('radioButtonValue',radioButtonValue);
                                if(radioButtonValue==='Yes'){
                                cy.get('textarea[placeholder="Provide Description"]').should('be.visible').should('not.be.disabled')
                                cy.wait(1000);
                                cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(4).should('be.visible')
                                .should('not.be.disabled');
                                }else{
                                    cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(4).should('be.visible')
                                   .should('not.be.disabled');
                                   cy.wait(1000);
                                   cy.get('span[class="chakra-radio__control css-134kubt"]').eq(4).should('be.visible')
                                   .should('not.be.disabled').click();
                                   cy.wait(1000);
                                   cy.get('textarea[placeholder="Provide Description"]').scrollIntoView().should('be.visible').should('not.be.disabled')
                                   .click();
                                   cy.wait(1500);
                                   cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(4).scrollIntoView().should('be.visible')
                                   .should('not.be.disabled').click();
                                }
                            }else{
                                cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(4).scrollIntoView().should('be.visible')
                                   .should('not.be.disabled');
                                cy.wait(1500);
                                cy.get('span[class="chakra-radio__control css-134kubt"]').eq(4).should('be.visible')
                                   .should('not.be.disabled');
                                cy.get('body').then((bodyElement)=>{
                                    const bodyText=bodyElement.text();
                                    cy.get('span[class="chakra-radio__control css-8o2sux"]').eq(4).next().invoke('text').then((tex)=>{
                                        cy.log('tex',tex);
                                        expect(bodyText).to.contain(tex);
                                    })
                                    cy.get('span[class="chakra-radio__control css-134kubt"]').eq(4).next().invoke('text').then((tex)=>{
                                        cy.log('tex',tex);
                                        expect(bodyText).to.contain(tex);
                                    })
                                })
            
                            }
                        });
                        cy.get('select[class="chakra-select css-161pkch"]').eq(1).then((dropdown)=>{
                            const previouslySelectedOption=dropdown.val();
                        cy.get('select[class="chakra-select css-161pkch"]').eq(1).find('option').then((options)=>{
                            const actual=[...options].map(o=>o.value);
                            for(let i=0;i<actual.length;i++){
                                cy.get('select[class="chakra-select css-161pkch"]').eq(1).select(actual[i]);
                                cy.wait(500);
                            }
                        });cy.get('select[class="chakra-select css-161pkch"]').eq(1).select(previouslySelectedOption);
                        })
                        cy.contains('Save and continue').should('be.visible').should('not.be.disabled');
                        cy.wait(1000);
                        cy.get('svg[class="MedicalProfile_redIcon__GSJnh"]').eq(0).should('be.visible').should('not.be.disabled');
                        cy.wait(1000);
                        cy.get('svg[class="MedicalProfile_redIcon__GSJnh"]').eq(1).should('be.visible').should('not.be.disabled');

            
    })
})

