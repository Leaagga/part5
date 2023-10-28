import { useState } from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'
const Login=({ setUser,blogChangHandle,setBlogChangHandle,setMessage }) => {
  const [username,setUsername]=useState()
  const [password,setPassword]=useState()
  const handleLogin=async (event) => {
    event.preventDefault()

    try{
      const body=await loginService.login({ username:username,password:password })
      console.log(body)
      window.localStorage.setItem(
        'loggedBlogUser',JSON.stringify(body)
      )
      setUser(body)
      setUsername('')
      setPassword('')
      setBlogChangHandle(!blogChangHandle)
      setMessage(`${body.username} logged in`)
      setTimeout(() => setMessage(),5000)
    }catch(exception){
      console.log('Wrong credentials')
      console.log(exception)
      setMessage('Wrong username or password')
      setTimeout(() => setMessage(),5000)


    }}

  return(
    <div>
      <form onSubmit={handleLogin}>
        <div>
                username
          <input
            type='text'
            id='username'
            value={username}
            onChange={({ target }) => {setUsername(target.value)}} />
        </div>
        <div>
                password
          <input
            type='text'
            id='password'
            value={password}
            onChange={({ target }) => {setPassword(target.value)}} />
        </div>
        <button id='loginButton' type='submit'>login</button>
      </form>
    </div>)


}
Login.propTypes={
  setUser:PropTypes.func.isRequired,
  blogChangHandle:PropTypes.bool.isRequired,
  setBlogChangHandle:PropTypes.func.isRequired,
  setMessage:PropTypes.func.isRequired
}
export default Login