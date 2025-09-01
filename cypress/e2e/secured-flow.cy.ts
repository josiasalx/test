/// <reference types="cypress" />


describe('Secured profile update', () => {
it('Update name + password; re-login succeeds', () => {
const email = `qa+${Date.now()}@example.com`;


// Register and land authenticated
cy.registerViaUI('Sec User', email, 'Passw0rd!123');


// Navigate to profile and update data
cy.visit('/profile');
cy.get('[data-testid="profile-name"]').clear().type('Updated Name');
cy.get('[data-testid="profile-password"]').clear().type('NewPassw0rd!');
cy.get('[data-testid="profile-save"]').click();


// Expect success feedback
cy.contains(/saved|updated/i).should('be.visible');


// Logout and login again with the new password
cy.contains('button', /logout/i).click();
cy.loginViaUI(email, 'NewPassw0rd!');
cy.contains('button', /logout/i).should('be.visible');
});


it('JWT attached on secured API calls', () => {
const email = `qa+${Date.now()}@example.com`;
cy.registerViaUI('JWT User', email, 'Passw0rd!123');


// Intercept a specific secured endpoint your Profile page calls
// Adjust pattern to your API (e.g., **/api/profile or **/api/users/me)
cy.intercept('GET', '**/api/users/me').as('me');


cy.visit('/profile');


cy.wait('@me').then((interception: any) => {
const auth =
interception?.request?.headers?.authorization ||
interception?.request?.headers?.Authorization;
expect(auth, 'Authorization header').to.match(/^Bearer\s.+/);
});


// Fallback (if you don't have a specific endpoint):
// cy.intercept('GET', '**/api/**').as('api');
// cy.visit('/profile');
// cy.wait('@api').then((interception: any) => {
// const auth = interception?.request?.headers?.authorization;
// expect(auth).to.match(/^Bearer\s.+/);
// });
});
});