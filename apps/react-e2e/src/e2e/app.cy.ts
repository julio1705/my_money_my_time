describe('react-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display transactions table', () => {
    cy.get('[href="/transactions"]').click();
    cy.url().should('contain', '/transactions');
    //cy.intercept('GET', 'http://localhost:3000/', { fixture: 'example.json' });
  });
});
