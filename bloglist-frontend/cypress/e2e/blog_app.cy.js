describe('Blog app', function() {
  const user ={
    username:'username1',
    name:'name1',
    password:'password1'
  }
  const blog ={
    title:'title2',
    author:'author2',
    url:'url2'
  }
  beforeEach(function() {
    cy.request('POST','http://localhost:3003/api/testing/reset')
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
    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('username1')
        cy.get('#password').type('password1')
        cy.get('#loginButton').click()
      })

      it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('title1')
        cy.get('#author').type('author1')
        cy.get('#url').type('url1')
        cy.get('#blogCreateButton').click()

        cy.contains('title1 author1')
      })
      describe('when user create a blog', function(){
        beforeEach(function(){
          cy.request('POST','http://localhost:3003/api/login',user)
            .then(response => {
              cy.request({
                method:'POST',
                url:'http://localhost:3003/api/blogs',
                body:blog,
                headers:{
                  'Authorization':`Bearer ${response.body.token}`
                }
              })
            })
          cy.visit('http://localhost:5173/')
        })
        it('users can like a blog', function() {
          cy.contains('view').click()
          cy.get('#likesButton').parent().get('.likes').as('likesnum')
          cy.get('@likesnum').should('contain','0')
          cy.get('#likesButton').click()

          cy.get('@likesnum').should('contain','1')
        })
        it('user can delete the blog',function(){
          cy.contains('view').click()
          cy.get('#deleteButton').click()
          cy.get('#blogComponents').should('not.contain','title2 author2')
        })
        it('another user can\'t see the delete button',function(){
          const user2 ={
            username:'username2',
            name:'name2',
            password:'password2'
          }
          cy.request('POST','http://localhost:3003/api/users',user2)
          cy.get('#logoutButton').click()
          cy.get('#username').type('username2')
          cy.get('#password').type('password2')
          cy.get('#loginButton').click()
          cy.contains('view').click()
          cy.contains('title2 author2').parent().should('not.contain','remove')


        })
      })
    })
  })
})