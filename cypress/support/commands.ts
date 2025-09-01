/// <reference types="cypress" />

// Extend Cypress types
declare global {
  namespace Cypress {
    interface Chainable {
      registerViaUI(name: string, email: string, password: string): Chainable<void>;
      loginViaUI(email: string, password: string): Chainable<void>;
      loginAsAdmin(): Chainable<void>;
    }
  }
}

export {}; // 👈 important: makes this a module so the `declare global` merges properly

// Implement the commands
Cypress.Commands.add('registerViaUI', (name: string, email: string, password: string) => {
  cy.visit('/register');
  cy.get('[data-testid="register-name"]').clear().type(name);
  cy.get('[data-testid="register-email"]').clear().type(email);
  cy.get('[data-testid="register-password"]').clear().type(password);
  cy.get('[data-testid="register-submit"]').click();
});

Cypress.Commands.add('loginViaUI', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-testid="login-email"]').clear().type(email);
  cy.get('[data-testid="login-password"]').clear().type(password);
  cy.get('[data-testid="login-submit"]').click();
});

Cypress.Commands.add('loginAsAdmin', () => {
  const email = Cypress.env('adminEmail');
  const pass = Cypress.env('adminPassword');
  cy.loginViaUI(email, pass);
  cy.url().should('not.include', '/login');
});
