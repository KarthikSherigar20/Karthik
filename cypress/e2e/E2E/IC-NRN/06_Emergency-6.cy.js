import Num from "../../../fixtures/Number.json";
import login5 from "../../../support/login5-icnrn";

describe('IC-NRN-Ambulance-No', () => {
    before(() => {
        cy.wrap((null)).then(() => {
            login5()
        }).then(() => {
            cy.log('Login completed')
        })
    })
    it('Ambulance-No', () => {
        cy.get('body').then(($bodyText) => {
            const bodyText = $bodyText.text();
            if (bodyText.includes('New')) {

                cy.contains('New').prevAll().eq(2).invoke('text').then((text) => {
                    const storedText = text;
                    cy.contains('New').click();
                    cy.wait(1500);
                    cy.contains('By Mobile Number').scrollIntoView().click();
                    cy.wait(2000);
                    cy.get('input[placeholder="Enter Mobile No"]').type(Num.Numtosearch);
                    cy.wait(2000);
                    cy.contains('Search').click();
                    cy.wait(2000);
                    // cy.reload();
                    // cy.wait(2000);
                    cy.get('div[class="selectPatient_container_2__S9N5F"]').find('input[name="radio"]').first().click();
                    cy.wait(3000);

                    cy.get('div.container.selectPoc_wrapper__MBvMf', { timeout: 5000 }).then($div => {
                        if ($div.find('input[name="radio"]').length > 0) {
                            cy.wrap($div)
                                .find('input[name="radio"]')
                                .click();
                        } else {
                            // cy.log('Radio input not found — skipping click');
                            cy.get('div[class="container ticketBasicDetails_cardWrapper__Zq72v"]').find('p[class="text phoneNumber_value__Ktlo5"]')
                                .eq(1).invoke('text').then((mob) => {
                                    const mo = mob.trim();

                                    cy.wait(500);

                                    cy.contains('Add Poc').scrollIntoView().click();

                                    cy.wait(500);

                                    cy.get('input[placeholder="POC Name"]').type('POC');

                                    cy.get('input[placeholder="POC Mobile"]').type(mo)

                                })
                        }
                    });
                    cy.get('input[name="isAmbulanceRequired"]').eq(1).click();
                    cy.wait(1500);
                    cy.contains('Start Emergency').click();

                    cy.wait(500);
                    cy.get(`input[placeholder="Doctor's Name"]`).type('Doctor');

                    cy.wait(500);

                    cy.get(`[placeholder="Doctor's Number"]`).type(Num.Doc);
                    cy.wait(600);
                    cy.contains(' Send Meeting Link').click();
                    cy.wait(600);
                    cy.on('window:alert', (alertmsg) => {
                        expect(alertmsg).to.equal('MeetingLink Sent Successfully');
                    })
                    cy.contains('Comment').scrollIntoView().click();
                    cy.contains(/Agent No/i, { timeout: 10000 }).should('be.visible');
                    cy.window().then((win) => {
                        win.scrollTo(0, win.document.body.scrollHeight);
                    })

                    cy.contains(/Meeting link shared to patient/i, { timeout: 10000 }).scrollIntoView().should('be.visible');
                    cy.get('svg[data-icon="close"]').scrollIntoView().click();
                    cy.wait(600);

                    cy.contains('Share Patient’s Profile').click();
                    cy.wait(1500);
                    cy.get('body').should('contain', 'Patient details shared to doctor');
                    cy.wait(1500);
                    cy.contains('Emergency Resolved').click();
                    cy.wait(1500);
                    cy.contains(storedText).nextAll().eq(2).should('have.text', 'Completed');
                    cy.wait(1500);
                    cy.get('div[class="container tickets_table__naHin"]').find('tr[class="ant-table-row ant-table-row-level-0"]')
                        .first().click();

                    cy.wait(600)

                    cy.contains('Comment').scrollIntoView().click();
                    cy.contains(/Agent No/i, { timeout: 10000 }).should('be.visible');

                    cy.window().then((win) => {
                        win.scrollTo(0, win.document.body.scrollHeight)
                    })
                    cy.contains(/Ticket Resolved/i, { timeout: 10000 }).scrollIntoView().should('be.visible');
                    cy.get('svg[data-icon="close"]').scrollIntoView().click();
                })
            }
        })
    })
})