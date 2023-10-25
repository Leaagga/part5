import { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const Blogitem = ({ blog,user,blogChangHandle,setBlogChangHandle,setBlogs,blogs }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const handleLikes =(event) => {
    blogService.putLikes(blog,user.token)
      .then((response) => {console.log(response)
        setBlogChangHandle(!blogChangHandle)})
  }
  const handleDelete =(event) => {
    if (window.confirm(`Removing ${blog.title} ${blog.author}`)){
      blogService.removeBlog(blog,user.token)
        .then((response) => {if(response.status===204){
          setBlogs(blogs.filter(newblog => newblog.id!==blog.id))
          console.log(response)}})
    }
  }

  return(
    <div>
      <div><label className='titleAndAuthor'>
        {blog.title} {blog.author}
      </label><button onClick={toggleVisibility}>{visible?'hide':'view'}</button></div>
      <div style={showWhenVisible}>
        <div className='url'>{blog.url}</div>
        <div><label className='likes'>{blog.likes}</label><button onClick={handleLikes}>likes</button></div>
        <div>{blog.user.username}</div>
        <button onClick={handleDelete}>remove</button>
      </div>
    </div>)}
export default Blogitem