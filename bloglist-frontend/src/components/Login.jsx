import { useState } from 'react'
import loginService from '../services/login'

const Login=({setUser,blogChangHandle,setBlogChangHandle,setMessage})=>{
    const [username,setUsername]=useState()
    const [password,setPassword]=useState()
    const handleLogin=async (event)=>{
        event.preventDefault()

        try{
        const body=await loginService.login({username:username,password:password})
        console.log(body)
        window.localStorage.setItem(
            'loggedBlogUser',JSON.stringify(body)
        )
        setUser(body)
        setUsername('')
        setPassword('')
        setBlogChangHandle(!blogChangHandle)
        console.log(loginhandle)
        setMessage(`${body.username} logged in`)
        setTimeout(()=>setMessage(),5000)
    }catch(exception){
        console.log('Wrong credentials')
        console.log(exception)
        setMessage('Wrong username or password')
        setTimeout(()=>setMessage(),5000)


    }}

    return(
    <div>
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