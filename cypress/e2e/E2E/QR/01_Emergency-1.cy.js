import Num from '../../../fixtures/Number.json';
import login from '../../../support/login';

describe('QR-EM', () => {
    before(() => {
        cy.wrap(null).then(() => {
            login();
        }).then(() => {
            cy.log('Login completed');
        });
    })

    it('Emergency-1', () => {
        cy.get('body').then(($bodyText) => {
            const bodyText = $bodyText.text();
            if (bodyText.includes('New')) {

                cy.wait(1500);
                cy.contains('New').click();
                cy.wait(2000);
                cy.get('div[class="container selectPatient_container__02wpR"]').find('input[name="radio"]').first().click();
                cy.wait(600);

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

                cy.wait(600);
                cy.contains('Save Assessment').scrollIntoView().click();
                cy.wait(600);
                cy.get('div[class="backgroundWrapper_backgroundWrapper__o39ed pickupLocation_background__0UPLQ"]')
                    .find('div[class="addressCard_card__z5GWw"]').first().click();
                cy.wait(600);
                cy.contains('Select Drop Location', { timeout: 10000 }).scrollIntoView().should('be.visible');
                cy.get('div[class="container nearByHospital_addressCard__ORdPs"]').find('div[class="addressCard_card_flex__6BZvF"]')
                    .first().click();
                cy.wait(600);
                cy.contains('Start Emergency').click();
                cy.wait(600);

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

                cy.contains('Comment').scrollIntoView().click();
                cy.contains(/Agent No/i, { timeout: 10000 }).should('be.visible');

                cy.window().then((win) => {
                    win.scrollTo(0, win.document.body.scrollHeight)
                })

                cy.contains(/Patient Profile Shared/i, { timeout: 10000 }).scrollIntoView().should('be.visible');
                cy.get('svg[data-icon="close"]').scrollIntoView().click();

                cy.contains('Send Ambulance Message').scrollIntoView().click();
                cy.wait(3000);
                cy.get('body').then(($bodyText) => {
                    const bodyText = $bodyText.text();
                    expect(bodyText.includes('Ambulance Request Successfully Sent')).to.be.true;
                })
                cy.contains('Comment').scrollIntoView().click();
                cy.contains(/Agent No/i, { timeout: 10000 }).should('be.visible');


                cy.window().then((win) => {
                    win.scrollTo(0, win.document.body.scrollHeight)
                })

                cy.contains(/Pickup and drop location shared to agent/i, { timeout: 10000 }).scrollIntoView().should('be.visible');
                cy.get('svg[data-icon="close"]').scrollIntoView().click();

                cy.wait(600);
                cy.contains('Ambulance Dispatched').scrollIntoView().click();
                cy.wait(600);
                cy.get('body').then(($bodyText) => {
                    const bodyText = $bodyText.text();
                    expect(bodyText.includes('Success')).to.be.true;
                })
                cy.contains('Comment').scrollIntoView().click();
                cy.contains(/Agent No/i, { timeout: 10000 }).should('be.visible');


                cy.window().then((win) => {
                    win.scrollTo(0, win.document.body.scrollHeight)
                })
                cy.contains(/ambulanceDispatched/i, { timeout: 10000 }).scrollIntoView().should('be.visible');
                cy.get('svg[data-icon="close"]').scrollIntoView().click();
                cy.wait(600);

                cy.contains('Pickup Location').scrollIntoView().click();
                cy.wait(600);
                cy.get('body').then(($bodyText) => {
                    const bodyText = $bodyText.text();
                    expect(bodyText.includes('Success')).to.be.true;
                })
                cy.contains('Comment').scrollIntoView().click();
                cy.contains(/Agent No/i, { timeout: 10000 }).should('be.visible');


                cy.window().then((win) => {
                    win.scrollTo(0, win.document.body.scrollHeight)
                })
                cy.contains(/ambulanceArrivedPickupLocation/i, { timeout: 10000 }).scrollIntoView().should('be.visible');
                cy.get('svg[data-icon="close"]').scrollIntoView().click();
                cy.wait(600);

                cy.contains('Pickup Patient').scrollIntoView().click();
                cy.wait(600);
                cy.get('body').then(($bodyText) => {
                    const bodyText = $bodyText.text();
                    expect(bodyText.includes('Success')).to.be.true;
                })
                cy.contains('Comment').scrollIntoView().click();
                cy.contains(/Agent No/i, { timeout: 10000 }).should('be.visible');


                cy.window().then((win) => {
                    win.scrollTo(0, win.document.body.scrollHeight)
                })
                cy.contains(/patientPicked/i, { timeout: 10000 }).scrollIntoView().should('be.visible');
                cy.get('svg[data-icon="close"]').scrollIntoView().click();
                cy.wait(600);

                cy.contains('Patient Dropped').scrollIntoView().click();
                cy.wait(600);
                cy.get('body').then(($bodyText) => {
                    const bodyText = $bodyText.text();
                    expect(bodyText.includes('Success')).to.be.true;
                })
                cy.contains('Comment').scrollIntoView().click();
                cy.contains(/Agent No/i, { timeout: 10000 }).should('be.visible');


                cy.window().then((win) => {
                    win.scrollTo(0, win.document.body.scrollHeight)
                })
                cy.contains(/patientDropped/i, { timeout: 10000 }).scrollIntoView().should('be.visible');
                cy.get('svg[data-icon="close"]').scrollIntoView().click();
                cy.wait(600);

                cy.contains('Emergency Resolved').click();
                cy.wait(1000);
                cy.get('body').then(($bodyText) => {
                    const bodyText = $bodyText.text();
                    expect(bodyText.includes('Emergency Resolved Successfully')).to.be.true;
                })
                cy.wait(1000);

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

            }
        })
    })
})

