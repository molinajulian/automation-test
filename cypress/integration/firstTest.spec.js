describe('First test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  })

  it('Success login',  () => {
    logging()
    cy.url()
      .should('include', 'home')
  })

  it('Close session', () => {
    logging()
    cy.get('.nav-bar-account > .nav-bar-item > a')
      .click()
    cy.contains('Bienvenido')
  })

  it('Bad login', () => {
    cy.get('input#username')
      .type('ebedoyaalzate')
    cy.get('input#password')
      .type('1234')
    cy.get('button').click()
    cy.contains('La contraseña debe contener entre 8 y 14 caracteres')
    cy.get('input#username')
      .clear()
      .type('ebe')
    cy.get('button').click()
    cy.contains('El usuario debe contener entre 6 y 20 caracteres')
    cy.get('input#username')
      .clear()
    cy.contains('El usuario es requerido')
    cy.get('input#password')
      .clear()
    cy.contains('La contraseña requerida')
  })

  it('Get cupon', () => {
    logging()
    cy.get('#welcome-coupon')
      .click()
    cy.contains('Copia este código y úsalo para disfrutar de un descuento por única vez')
  })

  it('Make an order', () => {
    logging()
    cy.get('.align-center')
      .first()
      .click()
    cy.get('#order-confirm')
      .click()
    cy.contains('Tu pedido ha sido confirmado, te mantendremos informado ante nuevas novedades')
  })

  it('Add cupon to an order', () => {
    logging()
    cy.get('#welcome-coupon')
      .click()
    cy.get('.coupon-code').invoke('text').then(text => {
      cy.get('#coupon-modal > .modal-content > .close')
        .click()
      cy.get('.align-center')
        .first()
        .click()
      cy.get('.input-container > #coupon')
        .type(text)
      cy.get('#order-confirm')
        .click()
      cy.contains('Tu pedido ha sido confirmado, te mantendremos informado ante nuevas novedades')
    })
  })

  it('Watch cupons', () => {
    logging()
    cy.get('.nav-bar-menu > :nth-child(2) > .nav-bar-link')
      .click()
    cy.url('include', '/coupons')
  })

  it('Watch personal information', () => {
    logging()
    cy.get(':nth-child(3) > .nav-bar-link')
      .click()
    cy.url('include','profile')
  })
})

let logging = () => {
  cy.get('input#username')
    .type('ebedoyaalzate')
  cy.get('input#password')
    .type('12345678')
  cy.get('button').click()
}
