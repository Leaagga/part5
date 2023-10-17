import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername]=useState()
  const [password,setPassword]=useState()
  const [user,setUser]=useState()
  const [loginhandle,setLoginHandle]=useState(false)
  // useEffect(async () => {
  //   const blog =await blogService.setToken(body.token).getAll()
  //   setBlogs( blogs )
      
  // }, [])
  
  return (
    <div>
        {user
        ?<Blog blogs={blogs} setBlogs={setBlogs} user={user} username={username} setUser={setUser} loginhandle={loginhandle} setLoginHandle={setLoginHandle} />
        :<Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          user={user}
          setUser={setUser}
          loginhandle={loginhandle}
          setLoginHandle={setLoginHandle}
        />}
    </div>
  )
}

export default App