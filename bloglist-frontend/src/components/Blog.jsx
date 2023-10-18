import { useEffect, useState } from "react"
import blogService from '../services/blogs'
const Blogitem = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)
const Blog=({setBlogs,blogs,user,setUser,loginhandle})=>{
  const [author,setAuthor]=useState()
  const [url,setUrl]=useState()
  const [title,setTitle]=useState()
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
  }
  const handleCreate=(event)=>{
    event.preventDefault()
    const blog ={
      author:author,
      url:url,
      title:title

    }
    blogService.create(blog,user.token)
            .then(blog=>setBlogs(blogs.concat(blog)))

  }
  return(
      <div>
      <h2>blogs</h2>
      <div>
      <from>
        <label>
          {user.username} logged in.
        </label>
        <button onClick={logoutHandler}>
          logout
        </button>
      </from>
      <div>
        <h2>create new</h2>
        <form onSubmit={handleCreate}>
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
        </form>
      </div>
      </div>
      {blogs.map(blog =>
        <Blogitem key={blog.id} blog={blog} />
      )}
    </div>)
}
export default Blog