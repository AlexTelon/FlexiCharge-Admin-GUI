declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to log in.
     * @example cy.login('admin', 'admin')
     */
    login(username: string, password: string): Chainable<any>;
  }
}
