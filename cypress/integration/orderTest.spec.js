describe('Order test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/')
    logging()
  })

  it('Make an order', () => {
    cy.get('.align-center')
      .first()
      .click()
    cy.get('#order-confirm')
      .click()
    cy.contains('Tu pedido ha sido confirmado, te mantendremos informado ante nuevas novedades')
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
})

let logging = () => {
  cy.get('input#username')
    .type('ebedoyaalzate')
  cy.get('input#password')
    .type('12345678')
  cy.get('button').click()
}
