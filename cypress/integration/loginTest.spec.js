describe('login Test', () => {

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
})

let logging = () => {
  cy.get('[data-cy=loggin-user] > .input-container > #username')
    .type('ebedoyaalzate')
  cy.get('[data-cy=loggin-pass] > .input-container > #password')
    .type('12345678')
  cy.get('[data-cy=loggin-submit]').click()
}
