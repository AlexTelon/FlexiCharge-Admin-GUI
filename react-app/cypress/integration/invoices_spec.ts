/// <reference types="cypress" />

describe('RenderInvoices E2E', () => {
  it('should login as admin and render the invoices page', () => {
    cy.visit('/login');
    cy.get('[data-cy=username-input]').type('admin');
    cy.get('[data-cy=password-input]').type('admin');
    cy.get('[data-cy=login-btn]').click();
    cy.wait(5000);
    cy.get('[data-cy=Invoices-btn]').click();
    cy.get('[data-cy="all-invoices"]').should('be.visible');
  });
});