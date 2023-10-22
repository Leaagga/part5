import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import Login from './components/Login'
const App = () => {
  const [user,setUser]=useState()
  const [blogChangHandle,setBlogChangHandle]=useState(false)
  const [message,setMessage]=useState()
  const [createNoteVisible,setCreateNoteVisible]=useState(false)
  useEffect(() => {
    const loggedUserJSON=window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON){
      const localuser=JSON.parse(loggedUserJSON)
      console.log(localuser)
      setUser(localuser)
      setBlogChangHandle(!blogChangHandle)
    }}, [])
  return (
    <div>
      <div>
        {user?<h2>blogs</h2>:<h2>log in to application</h2>}
      </div>
      <Message message={message} />
      <div>
        {user
          ?<Blog
            user={user}
            setUser={setUser}
            blogChangHandle={blogChangHandle}
            setBlogChangHandle={setBlogChangHandle}
            setMessage={setMessage}
            createNoteVisible={createNoteVisible}
            setCreateNoteVisible={setCreateNoteVisible}
          />
          :<Login
            user={user}
            setUser={setUser}
            blogChangHandle={blogChangHandle}
            setBlogChangHandle={setBlogChangHandle}
            setMessage={setMessage}
          />}
      </div></div>
  )
}

export default App