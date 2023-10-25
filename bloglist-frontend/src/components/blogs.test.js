import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogitem from './Blogitem'

describe('test Blogitem',() => {
  let container
  beforeEach(() => {
    const blog={
      title:'title1',
      author:'author1',
      likes:1000,
      url:'url1',
      user:{
        username:'username1'
      }
    }
    container=render(<Blogitem blog={blog} />).container
    console.log(container)
  })
  test('render default',() => {
    const element=screen.getByText('title1 author1')
    screen.debug(element)
    expect(element).toBeDefined()
    const likes = container.querySelector('.ikes')
    const url =container.querySelector('.url')
    expect(likes).toBeNull()
    expect(url).toBeNull()

  })
  test('clicking button shows the likes and url',async () => {
    const user=userEvent.setup()
    const button=screen.getByText('view')
    await user.click(button)

    const likes = container.querySelector('.likes').innerHTML
    const url =container.querySelector('.url').innerHTML
    expect(likes).toBe('1000')
    expect(url).toBe('url1')
  })})
test('clicking likes button twice and the event handler called twice',async () => {
  const blog={
    title:'title1',
    author:'author1',
    likes:1000,
    url:'url1',
    user:{
      username:'username1'
    }
  }
  const mockHandler=jest.fn()
  const { container }=render(<Blogitem blog={blog} handleLikes={mockHandler}/>)
  console.log(container)
  const user=userEvent.setup()
  const viewButton=screen.getByText('view')
  await user.click(viewButton)

  const likesButton = screen.getByText('likes')
  await user.click(likesButton)
  await user.click(likesButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})