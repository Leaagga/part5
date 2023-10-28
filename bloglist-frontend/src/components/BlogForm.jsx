import React from 'react'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [author,setAuthor]=useState()
  const [url,setUrl]=useState()
  const [title,setTitle]=useState()
  const handleAuthorChange=({ target }) => {
    setAuthor(target.value)
  }
  const handleTitleChange=({ target }) => {
    setTitle(target.value)
  }
  const handleUrlChange=({ target }) => {
    setUrl(target.value)
  }
  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      author:author,
      url:url,
      title:title
    })
    setAuthor()
    setUrl()
    setTitle()

  }
  return(<div>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      <div>
            title
        <input value={title} id='title' name='title' onChange={handleTitleChange} />
      </div>
      <div>
            author
        <input value={author} id='author' name='author' onChange={handleAuthorChange} />
      </div>
      <div>
            url
        <input value={url} id='url' name='url' onChange={handleUrlChange} />
      </div>
      <button id='blogCreateButton' type='submmit'>create</button>
    </form></div>)

}
export default  BlogForm