describe('My First Test con cy.session()', () => {
    function login(){
      cy.get('#user-name', { timeout: 10000 }).should('be.visible').type('standard_user');
      cy.get('#password', { timeout: 10000 }).should('be.visible').type('secret_sauce');
      cy.get('#login-button', { timeout: 10000 }).click();
    }

    beforeEach(()=>{
        cy.visit('https://www.saucedemo.com/');
    });    

    it('login', () => {
        login();
        cy.url().should('include', '/inventory.html');
      });
    

    it('Agregar items al carrito!', () => {
      login();
      //Add an item + validate the status change
      cy.get('#add-to-cart-sauce-labs-backpack', { timeout: 20000 }).click();
      cy.get('#remove-sauce-labs-backpack').should('be.visible');
      //cy.get('#remove-sauce-labs-backpack', { timeout: 10000 }).should('contain','Remove')

      //Add second item
      cy.get('#add-to-cart-sauce-labs-bike-light', { timeout: 10000 }).click()
      cy.get('#remove-sauce-labs-bike-light', { timeout: 10000 }).should('contain','Remove')

      //add an action
      cy.get('#add-to-cart-sauce-labs-bolt-t-shirt', { timeout: 10000 }).click()
      cy.get('#remove-sauce-labs-bolt-t-shirt', { timeout: 10000 }).should('contain','Remove')
    });



/*
    it('Login y agregar producto', () => {
  cy.visit('https://www.saucedemo.com/');
  cy.get('#user-name').type('standard_user');
  cy.get('#password').type('secret_sauce');
  cy.get('#login-button').click();

  cy.url().should('include', '/inventory.html');
  cy.get('#add-to-cart-sauce-labs-backpack').click();
  cy.get('.shopping_cart_badge').should('contain', '1');
});





  it('Login negativo!', () => {
    cy.visit('https://www.saucedemo.com')
    //cy.contains('type').click()
  
    //get an input and type into it
    cy.get('#user-name', { timeout: 10000 }).should('be.visible').type('standard_user')

    //now with the pw
    cy.get('#password', { timeout: 10000 }).should('be.visible').type('123456')

    //add an action
    cy.get('#login-button', { timeout: 10000 }).click()
    cy.get('.error-message-container', { timeout: 20000 }).should('contain','Epic sadface: Username and password do not match any user in this service')

  });

  afterEach(()=>{
    if(hacerLogout){
    cy.get('#react-burger-menu-btn', { timeout: 20000 }).should('be.visible').click()
    cy.get('#logout_sidebar_link', { timeout: 10000 }).should('be.visible').click()
    hacerLogout = false
    }
  });*/
});
