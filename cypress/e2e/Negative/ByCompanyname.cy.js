import login from '../../support/login';

describe('Search name and company', () => {
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
        cy.contains('By Company Name & Beneficiary Name').scrollIntoView().click();
        cy.wait(2000);
        cy.contains('Search').click();
        cy.wait(3000);
        cy.get('body').should('contain', 'Please provide benName or companyId');
      }
    })
  })
})

