import login from '../../../support/login'

describe('Date&Time', () => {
  before(() => {
    cy.wrap(null).then(() => {
      login();
    }).then(() => {
      cy.log('Login completed');
    });
  })

  it('Date&Time', () => {
    cy.get('body').then(($bodyText) => {
      const bodyText = $bodyText.text();
      if (bodyText.includes('New')) {
        cy.wait(1500);

        // Get the current date and format it as 'MM/DD/YYYY HH'
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1); // Months are zero-indexed
        const year = currentDate.getFullYear();
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const formattedDate = `${month}/${day}/${year}, ${hours}`;

        cy.wait(1500);
        cy.contains('New').prevAll().eq(0).invoke('text').then((text) => {
          const partialText = formattedDate;
          expect(text).to.include(partialText);
        });
      }
    })
  })
})