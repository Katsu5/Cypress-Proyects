describe('My First Test', () => {
  let preciosInventario = [];
  let totalCalculado;

  beforeEach(() => {
    cy.fixture('credenciales').then((data) => {
      cy.login(data.usuario, data.contraseña);
    });

  });

  it('Agregar items al carrito!', () => {
    //Add a function + validate the status change 
    cy.agregarProductos();
    cy.get('#remove-sauce-labs-backpack').should('be.visible').and('contain', 'Remove')
    //Add second item
    cy.get('#remove-sauce-labs-bike-light').should('be.visible').and('contain', 'Remove')
    //add third atem
    cy.get('#remove-sauce-labs-bolt-t-shirt').should('be.visible').and('contain', 'Remove')
  });

  //Verificar el carrito de compras
  it('Validar precios inventario/carrito', () => {
    cy.agregarProductos();
    cy.get('[data-test="inventory-item"]')
      .filter(':has(button[data-test^="remove"])') // Solo los agregados
      .each(($item) => {
        cy.wrap($item)
          .find('[data-test="inventory-item-price"]')
          .invoke('text')
          .then((precio) => {
            preciosInventario.push(precio.trim());
          });
      })
      .then(() => {
        // Ir al carrito
        cy.get('[data-test="shopping-cart-link"]').click();
      });
    // Ir al carrito
    cy.get('.cart_item')
      .each(($item, index) => {
        cy.wrap($item)
          .find('.inventory_item_price')
          .invoke('text')
          .then((precioCarrito) => {
            expect(precioCarrito.trim()).to.eq(preciosInventario[index]);
          });
      });
  
    cy.log('*******Validación de cantidad de articulos*******');
    cy.get('.shopping_cart_link').click()
    cy.log('*******Validación de numero de productos en el carro con el numero de items*******');
    cy.get('.shopping_cart_badge').should('be.visible').and('have.text', '3')
    cy.get('.cart_item').should('have.length', '3');
  })

  it.only("Completar el checkout", () => {
    const data ={ subTotal1: 0, Tax: 0}
    let subTotalTax;
    cy.agregarProductos();
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"').should('be.visible').click();
    //agregar datos a los campos
    cy.fixture('checkout').then((data) => {
      cy.get('[data-test="firstName"]').type(data.firstName);
      cy.get('[data-test="lastName"]').type(data.lastName);
      cy.get('[data-test="postalCode"]').type(data.postalCode);
      cy.get('[data-test="continue"]').click();
    });
    //Capturar los precios
    cy.get('.cart_item .inventory_item_price')
      .each(($el) => {
        cy.wrap($el)
          .invoke('text')
          .then((subtotalItems) => {
            const valores = parseFloat(subtotalItems.replace(/[^0-9.]/g, ''));
            preciosInventario.push(valores);
          });
      })
      .then(() => {
        let sumaArray = preciosInventario.reduce((a, b) => a + b, 0);
        //obtener subtotal del DOM 
        cy.get('[data-test="subtotal-label"]')
          .invoke('text')
          .then((valorCampoSubtotal) => {
            data.subTotal1 = parseFloat(valorCampoSubtotal.replace(/[^0-9.]/g, ''));
            console.log('El total del subtotal es: ' + data.subTotal1);
            //Comparamos
            expect(data.subTotal1).to.eq(sumaArray);
          });
    
        //Validar total
        cy.get('[data-test="tax-label"]')
          .invoke('text')
          .then((valorTax) => {
            data.Tax = parseFloat(valorTax.replace(/[^0-9.]/g, ''));
            console.log('El total del tax es: ' + data.Tax);
          });
      });
      //se obtiene el total
    cy.then(() => {
      totalCalculado = data.subTotal1 + data.Tax;
      console.log('El total calculado es: ' + totalCalculado);
      
      cy.get('[data-test="total-label"]')  
        .invoke('text')
        .then((valorTotal) => {
          const totalDOM = parseFloat(valorTotal.replace(/[^0-9.]/g, ''));
          console.log('El total del dom es: ' + totalDOM);

          expect(totalCalculado).to.eq(totalDOM)
        });
      });
    cy.get('[data-test="finish"]').click();
    cy.get('h2').should('contain','Thank you for your order!')
  })
   
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
});

