describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST','http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173/')
  })

  it('Login form is shown', () => {
    cy.contains('log in to application')

  })
})