import { useEffect, useState } from "react"
import blogService from '../services/blogs'
import Togglable from "./Togglable"
const Blogitem = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)
const BlogForm = ({onSubmit,title,author,url,handleAuthorChange,handleTitleChange,handleUrlChange}) =>{
  return(<div>
        <h2>create new</h2>
        <form onSubmit={onSubmit}>
          <div>
            title
            <input value={title} name='title' onChange={handleTitleChange} />
          </div>
          <div>
            author
            <input value={author} name='author' onChange={handleAuthorChange} />
          </div>
          <div>
            url
            <input value={url} name='url' onChange={handleUrlChange} />
          </div>
          <button type='submmit'>create</button>
        </form></div>)

}
const Blog=({user,setUser,loginhandle,setMessage,createNoteVisible,setCreateNoteVisible})=>{
  const [author,setAuthor]=useState()
  const [url,setUrl]=useState()
  const [title,setTitle]=useState()
  const [blogs, setBlogs] = useState([])


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
    try{    
      const blog ={
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
      <Togglable buttonLabel='new blog'>
        <BlogForm
        onSubmit={handleCreate}
        title={title}
        author={author}
        url={url}
        handleAuthorChange={({target})=>{setAuthor(target.value)}}
        handleTitleChange={({target})=>{setTitle(target.value)}}
        handleUrlChange={({target})=>{setUrl(target.value)}}
          />
      </Togglable>
      </div>
      {blogs.map(blog =>
        <Blogitem key={blog.id} blog={blog} />
      )}
    </div>)
}
export default Blog