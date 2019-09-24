/// <reference types="Cypress" />

describe('Basic test', () => {
    it('Responds with a 200 OK', () => {
        cy.visit('http://localhost:3000');
    });
});
