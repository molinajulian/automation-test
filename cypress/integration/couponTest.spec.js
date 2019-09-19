describe('Coupon test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/')
    logging()
  })

  it('Get cupon', () => {
    cy.get('#welcome-coupon')
      .click()
    cy.contains('Copia este código y úsalo para disfrutar de un descuento por única vez')
  })

  it('Add cupon to an order', () => {
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
    cy.get('.nav-bar-menu > :nth-child(2) > .nav-bar-link')
      .click()
    cy.url('include', '/coupons')
  })

  it('Watch coupons used', () => {
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
      cy.wait(3000)
      cy.get('[data-cy=confirmation-close]')
        .click()
      cy.get('.nav-bar-menu > :nth-child(2) > .nav-bar-link')
        .click()
      cy.contains(text)
    })
  })
})

let logging = () => {
  cy.get('input#username')
    .type('ebedoyaalzate')
  cy.get('input#password')
    .type('12345678')
  cy.get('button').click()
}
