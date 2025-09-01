/// <reference types="cypress" />


describe('Auth', () => {
it('Register → auto-login (happy path)', () => {
const email = `qa+${Date.now()}@example.com`;
cy.registerViaUI('QA User', email, 'Passw0rd!123');
cy.contains('button', /logout/i).should('be.visible');
});


it('Login negative — invalid credentials', () => {
cy.loginViaUI('doesnotexist@example.com', 'WrongPass!123');
cy.contains(/invalid|incorrect|unauthorized/i).should('be.visible');
});


it('Protected route redirect preserves return url', () => {
cy.visit('/profile');
cy.url().should('include', '/login');
const email = `qa+${Date.now()}@example.com`;
cy.registerViaUI('Return User', email, 'Passw0rd!123');
cy.url().should('include', '/profile');
});
});