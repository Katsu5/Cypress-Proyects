// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
 Cypress.Commands.add('login', (usuario, contraseña) => {
  cy.visit('/');
  cy.get('#user-name').type(usuario);
  cy.get('#password').type(contraseña);
  cy.get('#login-button').click();
  cy.url().should('include', '/inventory.html');
});

 Cypress.Commands.add('agregarProductos', () => {
  cy.get('#add-to-cart-sauce-labs-backpack').should('be.visible').click();
  cy.get('#add-to-cart-sauce-labs-bike-light').should('be.visible').click();
  cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').should('be.visible').click();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })