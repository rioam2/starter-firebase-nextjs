/// <reference types="Cypress" />

describe('Basic test', () => {
	it('Responds with a 200 OK', () => {
		cy.visit('/');
	});
});
