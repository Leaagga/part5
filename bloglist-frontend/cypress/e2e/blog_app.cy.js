describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST','http://localhost:3003/api/testing/reset')
    const user ={
      username:'username1',
      name:'name1',
      password:'password1'
    }
    cy.request('POST','http://localhost:3003/api/users',user)
    cy.visit('http://localhost:5173/')
  })

  it('Login form is shown', () => {
    cy.contains('log in to application')

  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('username1')
      cy.get('#password').type('password1')
      cy.get('#loginButton').click()

      cy.contains('name1 logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('username1')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()

      cy.contains('Wrong username or password')
    })
  })
})