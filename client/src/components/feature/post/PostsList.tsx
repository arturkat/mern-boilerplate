import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '@/store'
import {loadPosts, setPosts} from '@/store/slices/postsSlice'
import {IPostResponse} from '@/types/post'
import ULoader from '@comp/UI/ULoader'
import UButton from '@comp/UI/UButton'
import { FaRegTrashAlt } from 'react-icons/fa'
import PostItem from './PostItem'
import styled from 'styled-components';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'

export const PostsListContainer = styled.div`
  .post-enter {
    opacity: 0;
    transform: translateY(-100%);
  }
  .post-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 500ms ease-in, transform 500ms ease-in-out;
  }
  .post-exit {
    opacity: 1;
    transform: translateY(0);
  }
  .post-exit-active {
    opacity: 0;
    transform: translateY(100%);
    transition: opacity 500ms ease-in, transform 500ms ease-in-out;
  }
`;

const PostsList = () => {

  const dispatch = useAppDispatch()
  const posts: IPostResponse[] = useAppSelector(state => state.posts.posts)
  const isLoading: boolean = useAppSelector(state => state.posts.isLoading)

  useEffect(() => {
    (async () => {
      const loadedPosts = await dispatch(loadPosts())
    })()
  }, [])

  return (
    <PostsListContainer>

      {isLoading && <ULoader className="mb-4" />}

      {!posts.length && <h5>There is no posts yet</h5>}

      <TransitionGroup className="grid grid-cols-3 gap-4">
        {posts.map((post: IPostResponse) => (
            <CSSTransition
              key={post._id}
              timeout={500}
              classNames="post"
            >
              <PostItem post={post} key={post._id} />
            </CSSTransition>
        ))}
      </TransitionGroup>

    </PostsListContainer>
  )
}

export default PostsList
