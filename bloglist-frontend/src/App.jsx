import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import Login from './components/Login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername]=useState()
  const [password,setPassword]=useState()
  const [user,setUser]=useState()
  const [loginhandle,setLoginHandle]=useState(false)
  const [message,setMessage]=useState()
  useEffect(() => {
    const loggedUserJSON=window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON){
      const localuser=JSON.parse(loggedUserJSON)
      console.log(localuser)
      setUser(localuser)
      setLoginHandle(!loginhandle)
    }
      
}, [])
  
  return (
  <div>
    <div>
      {user?<h2>blogs</h2>:<h2>log in to application</h2>}
    </div>
    <Message message={message} />
    <div>
        {user
        ?<Blog blogs={blogs} setBlogs={setBlogs} user={user} username={username} setUser={setUser} loginhandle={loginhandle} setLoginHandle={setLoginHandle} setMessage={setMessage}/>
        :<Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          user={user}
          setUser={setUser}
          loginhandle={loginhandle}
          setLoginHandle={setLoginHandle}
          setMessage={setMessage}
        />}
    </div></div>
  )
}

export default App