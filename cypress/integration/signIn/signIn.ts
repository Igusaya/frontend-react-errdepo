describe('cypress signIn', () => {
  const baseUrl = Cypress.env('baseUrl');

  it('', () => {
    cy.visit(baseUrl);
    cy.get('.makeStyles-link-78 > .MuiButton-label').click();
    cy.get('#inputUserName').type('testuser');
    cy.get('#inputPassword').type('ezlife1982');
    cy.get('form > .MuiButtonBase-root').click();
    cy.get('[data-testid=user-button]').click();
    cy.get('[data-testid=sign-out-button]').click();
    cy.location('pathname').should('eq', '/');
  });
});
