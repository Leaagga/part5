import { useEffect, useState } from "react"
import blogService from '../services/blogs'
const Blogitem = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)
const Blog=({user,setUser,loginhandle,setMessage,createNoteVisible,setCreateNoteVisible})=>{
  const [author,setAuthor]=useState()
  const [url,setUrl]=useState()
  const [title,setTitle]=useState()
  const [blogs, setBlogs] = useState([])
  const hideWhenVisible = {display:createNoteVisible?'none':''}
  const showWhenVisible = {display:createNoteVisible?'':'none'}


    useEffect(() => {  
    try{
      console.log(loginhandle)
      console.log(user.token)
    blogService
    .getAll(user.token)
    .then(bloglist=>setBlogs(bloglist))
    console.log(blogs)
  }catch(exception){
    console.log(exception)
  }}, [loginhandle])

  const logoutHandler=(event)=>{
    event.preventDefault()
    setUser()
    setBlogs([])
    blogService.setToken('')
    window.localStorage.clear()
    setMessage('Logged out')
    setTimeout(()=>setMessage(),5000)
  }

  const handleCreate=(event)=>{
    event.preventDefault()
    try{    const blog ={
      author:author,
      url:url,
      title:title

    }
    blogService.create(blog,user.token)
            .then(blog=>setBlogs(blogs.concat(blog)))
    setMessage(`a new blog ${blog.title} by ${blog.author} added`)
    setTimeout(()=>setMessage(),5000)
  }catch(exception){
    setMessage(exception)
    setTimeout(()=>setMessage(),5000)
    
  }
  }
  return(
      <div>
      <div>
      <from>
        <label>
          {user.username} logged in.
        </label>
        <button onClick={logoutHandler}>
          logout
        </button>
      </from>
      <button type="button" onClick={({target})=>setCreateNoteVisible(true)} style={hideWhenVisible}>new note</button>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={handleCreate} >
          <div>
            title
            <input value={title} name='title' onChange={({target})=>{setTitle(target.value)}} />
          </div>
          <div>
            author
            <input value={author} name='author' onChange={({target})=>{setAuthor(target.value)}} />
          </div>
          <div>
            url
            <input value={url} name='url' onChange={({target})=>{setUrl(target.value)}} />
          </div>
          <button type='submmit'>create</button>
          <button type="button" onClick={({target})=>setCreateNoteVisible(false)}>cancel</button>
        </form>
        
      </div>
      </div>
      {blogs.map(blog =>
        <Blogitem key={blog.id} blog={blog} />
      )}
    </div>)
}
export default Blog