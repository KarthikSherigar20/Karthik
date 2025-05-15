import login from "../../../support/login";

describe('Address-Slider', () => {
    before(() => {
        cy.wrap((null)).then(() => {
            login()
        }).then(() => {
            cy.log('Login completed')
        })
    })
    it('Address-Slider', () => {
        cy.get('body').then(($bodyText) => {
            const bodyText = $bodyText.text();
            if (bodyText.includes('New')) {

                cy.contains('New').click();
                cy.wait(1500);
                cy.get('input[class="radioButton_radio__Dmg-B"]').eq(3).scrollIntoView().click();
                cy.wait(1500);
                cy.get('input[class="radioButton_radio__Dmg-B"]').eq(7).scrollIntoView().click();
                cy.wait(1500);
                cy.get('input[name="isAmbulanceRequired"]').eq(1).click();
                cy.wait(1500);
                cy.contains('Save Assessment').scrollIntoView().click();
                // cy.wait(1500);
                // cy.get('input[type="radio"]').eq(0).click();
                // cy.wait(1500);
                // cy.get('body').should('contain','Preferred Hospital');
                // cy.wait(1500);
                // cy.get('body').should('contain','Increase Search Radius');
                // cy.wait(1500);
                // cy.get('body').should('contain','Select Drop Location');
                // cy.wait(1500);
                // cy.get('.ant-slider-dot').then($slider => {
                //     const width = $slider.width();
                //     const targetValue = 100; // Value to set, in percentage
                //     const targetPosition = (targetValue / 100) * width;

                //     cy.get('.ant-slider-handle').then($thumb => {
                //         const thumbWidth = $thumb.width();
                //         const startX = $thumb.offset().left + (thumbWidth / 2);
                //         const endX = startX + targetPosition;

                //         cy.wrap($thumb)
                //         .trigger('mousedown', { which: 1, pageX: startX })
                //         .trigger('mousemove', { which: 1, pageX: endX })
                //         .trigger('mouseup', { force: true });
                // });
                // })
            }
        })
    })
})