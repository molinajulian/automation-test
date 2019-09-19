describe('First test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/')
    logging()
  })

  it('Watch personal information', () => {
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
