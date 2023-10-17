import { useEffect } from "react"
import blogService from '../services/blogs'
const Blogitem = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)
const Blog=({setBlogs,blogs,user,setUser,loginhandle})=>{
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
      </div>
      {blogs.map(blog =>
        <Blogitem key={blog.id} blog={blog} />
      )}
    </div>)
}
export default Blog