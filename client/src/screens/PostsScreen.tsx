import React from 'react'
import PostForm from '@comp/feature/post/PostForm'
import PostsList from '@comp/feature/post/PostsList'

const PostsScreen = () => {
  return (
    <div>
      <h1 className="mb-5">Posts Screen</h1>
      <PostForm />
      <PostsList />
    </div>
  )
}

export default PostsScreen