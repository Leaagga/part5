import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blogitem from './Blogitem'

test('render default',() => {
  const blog={
    title:'title1',
    author:'author1',
    likes:0,
    user:{
      username:'username1'
    }
  }
  const { container }=render(<Blogitem blog={blog} />)
  const element=screen.getByText('title1 author1')
  screen.debug(element)
  expect(element).toBeDefined()
  const likes = container.querySelector('#likes')
  const url =container.querySelector('#url')
  expect(likes).toBeNull()
  expect(url).toBeNull()

})