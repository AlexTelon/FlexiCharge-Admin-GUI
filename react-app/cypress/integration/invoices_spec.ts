/// <reference types="cypress" />

describe('Invoices page', () => {
  it('should login as admin', () => {
    cy.login('admin', 'admin');
  })

  it('should navigate to the invoices page', () => {
    cy.get('[data-cy=nav-invoices]').click();
    cy.url().should('include', '/Dashboard/invoices');
  });

  it('should filter invoices by year', () => {
    cy.viewport(800, 600)
    cy.get('[data-cy=year-filter-cover]')
      .scrollIntoView()
      .click()
      .get('[data-cy=year-filter]')
      .select('2022', { force: true })
  })
})