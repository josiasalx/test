/// <reference types="cypress" />


describe('Admin CRUD', () => {
beforeEach(() => {
cy.loginAsAdmin();
});


it('Create → Edit → Delete entity', () => {
cy.visit('/admin/entities');


// Create
cy.get('[data-testid="entity-title"]').clear().type('Cypress Entity');
cy.get('[data-testid="admin-create"]').click();
cy.contains('Cypress Entity').should('be.visible');


// Edit
cy.contains('[data-testid="entity-row"]', 'Cypress Entity').click();
cy.get('[data-testid="entity-title"]').clear().type('Cypress Entity Updated');
cy.get('[data-testid="entity-save"]').click();
cy.contains('Cypress Entity Updated').should('be.visible');


// Delete
cy.contains('[data-testid="entity-row"]', 'Cypress Entity Updated')
.find('[data-testid="entity-delete"]').click();
cy.contains('Cypress Entity Updated').should('not.exist');
});


it('Creating entity without title shows error (negative)', () => {
cy.visit('/admin/entities');
cy.get('[data-testid="entity-title"]').clear();
cy.get('[data-testid="admin-create"]').click();
cy.contains(/title required|required/i).should('be.visible');
});
});