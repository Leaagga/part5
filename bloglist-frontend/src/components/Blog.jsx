import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import Blogitem from './Blogitem'
import BlogForm from './BlogForm'
// const Blogitem = ({ blog,user,blogChangHandle,setBlogChangHandle,setBlogs,blogs }) => {
//   const [visible, setVisible] = useState(false)

//   const hideWhenVisible = { display: visible ? 'none' : '' }
//   const showWhenVisible = { display: visible ? '' : 'none' }

//   const toggleVisibility = () => {
//     setVisible(!visible)
//   }
//   const handleLikes =(event) => {
//     blogService.putLikes(blog,user.token)
//       .then((response) => {console.log(response)
//         setBlogChangHandle(!blogChangHandle)})
//   }
//   const handleDelete =(event) => {
//     if (window.confirm(`Removing ${blog.title} ${blog.author}`)){
//       blogService.removeBlog(blog,user.token)
//         .then((response) => {if(response.status===204){
//           setBlogs(blogs.filter(newblog => newblog.id!==blog.id))
//           console.log(response)}})
//     }
//   }

//   return(
//     <div>
//       <div><label>
//         {blog.title} {blog.author}
//       </label><button onClick={toggleVisibility}>{visible?'hide':'view'}</button></div>
//       <div style={showWhenVisible}>
//         <div>{blog.url}</div>
//         <div><label>{blog.likes}</label><button onClick={handleLikes}>likes</button></div>
//         <div>{blog.user.username}</div>
//         <button onClick={handleDelete}>remove</button>
//       </div>
//     </div>)}
// const BlogForm = ({ onSubmit,title,author,url,handleAuthorChange,handleTitleChange,handleUrlChange }) => {
//   return(<div>
//     <h2>create new</h2>
//     <form onSubmit={onSubmit}>
//       <div>
//             title
//         <input value={title} name='title' onChange={handleTitleChange} />
//       </div>
//       <div>
//             author
//         <input value={author} name='author' onChange={handleAuthorChange} />
//       </div>
//       <div>
//             url
//         <input value={url} name='url' onChange={handleUrlChange} />
//       </div>
//       <button type='submmit'>create</button>
//     </form></div>)

// }
const Blog=({ user,setUser,blogChangHandle,setBlogChangHandle,setMessage }) => {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    try{
      console.log(blogChangHandle)
      console.log(user.token)
      blogService
        .getAll(user.token)
        .then(bloglist => setBlogs(bloglist))
      console.log(blogs)
    }catch(exception){
      console.log(exception)
    }}, [blogChangHandle])

  const logoutHandler=(event) => {
    event.preventDefault()
    setUser()
    setBlogs([])
    blogService.setToken('')
    window.localStorage.clear()
    setMessage('Logged out')
    setTimeout(() => setMessage(),5000)
  }

  const handleCreate=({ author,url,title }) => {
    try{
      const blog ={
        author:author,
        url:url,
        title:title }
      blogService.create(blog,user.token)
        .then(blog => setBlogs(blogs.concat(blog)))
      setMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => setMessage(),5000)
      console.log(blogs)
    }catch(exception){
      setMessage(exception)
      setTimeout(() => setMessage(),5000)}
  }
  const handleLikes =(blog,user) => {
    blogService.putLikes(blog,user.token)
      .then((response) => {console.log(response)})
  }
  return(
    <div>
      <div>
        <form>
          <label>
            {user.username} logged in.
          </label>
          <button onClick={logoutHandler}>
          logout
          </button>
        </form>
        <Togglable buttonLabel='new blog'>
          <BlogForm
            createBlog={handleCreate}
          />
        </Togglable>
      </div>
      {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
        <Blogitem
          key={blog.id}
          blog={blog}
          user={user}
          blogChangHandle={blogChangHandle}
          setBlogChangHandle={setBlogChangHandle}
          blogs={blogs}
          setBlogs={setBlogs}
          addLikes={handleLikes}/>
      )}
    </div>)
}
export default Blog
