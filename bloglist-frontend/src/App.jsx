import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername]=useState()
  const [password,setPassword]=useState()
  const [user,setUser]=useState()
  // useEffect(async () => {
  //   const blog =await blogService.setToken(body.token).getAll()
  //   setBlogs( blogs )
      
  // }, [])
  
  return (
    <div>
        {user
        ?<Blog blogs={blogs} setBlogs={setBlogs} user={user} username={username}/>
        :<Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          user={user}
          setUser={setUser}
        />}
    </div>
  )
}

export default App