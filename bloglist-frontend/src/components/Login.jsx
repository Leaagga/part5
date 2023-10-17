import { useState } from 'react'
import loginService from '../services/login'

const Login=({ username, password, setUsername, setPassword,setUser,setLoginHandle,loginhandle})=>{
    const handleLogin=async (event)=>{
        event.preventDefault()

        try{
        const body=await loginService.login({username:username,password:password})
        console.log(body)
        setUser(body)
        setUsername('')
        setPassword('')
        setLoginHandle(!loginhandle)
        console.log(loginhandle)
    }catch(exception){
        console.log('Wrong credentials')
        console.log(exception)


    }}

    return(
    <div>
        <h2>
            log in to application
        </h2>
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                type='text'
                value={username}
                onChange={({target})=>{setUsername(target.value)}} />
            </div>
            <div>
                password
                <input
                type='text'
                value={password}
                onChange={({target})=>{setPassword(target.value)}} />
            </div>
            <button type='submit'>login</button>
        </form>
    </div>)


}
export default Login