import { useEffect } from "react"
import blogService from '../services/blogs'
const Blogitem = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)
const Blog=({setBlogs,blogs,user})=>{
    useEffect(() => {  
    try{
      console.log(user.token)
    blogService
    .getAll(user.token)
    .then(bloglist=>setBlogs(bloglist))
    console.log(bloglist)
  }catch(exception){
    console.log(exception)
  }}, [user.token])
  return(
      <div>
      <h2>blogs</h2>
      <p>{user.username}logged in.</p>
      {blogs.map(blog =>
        <Blogitem key={blog.id} blog={blog} />
      )}
    </div>)
}
export default Blog