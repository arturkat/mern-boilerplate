import React, {useState} from 'react'
import UTextInput from '@comp/UI/UTextIntput'
import UButton from '@comp/UI/UButton'
import {setAuth} from '@/store/slices/authSlice'
import {useAppDispatch, useAppSelector} from '@/store'
import {createPostAsync, loadPosts} from '@/store/slices/postsSlice'
import {IPostResponse} from '@/types/post'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import {FaRegTrashAlt} from 'react-icons/fa'

const PostForm = () => {

  const dispatch = useAppDispatch()
  const isPostsLoading = useAppSelector(store => store.posts.isLoading)

  const [isPostCreateLoading, setIsPostCreateLoading] = useState(false)

  const [fields, setFields] = useState({
    title: 'title n',
    body: 'body n'
  } as IPostResponse)

  return (
    <form className='mb-6' onSubmit={(e) => e.preventDefault()} >

      <div className="grid grid-flow-col-dense gap-2 mb-4">
        <UTextInput
          label="Title"
          name="title"
          type="text"
          value={fields.title}
          onChange={e => setFields({...fields, title: e.target.value})} />

        <UTextInput
          label="Body"
          name="body"
          type="text"
          value={fields.body}
          onChange={e => setFields({...fields, body: e.target.value})} />
      </div>

      <div className="grid grid-flow-col-dense gap-2">
        <UButton
          isLoading={isPostCreateLoading}
          onClick={async () => {
            setIsPostCreateLoading(true)
            await dispatch(createPostAsync(fields))
            setIsPostCreateLoading(false)
          }}
        >
          Create Post
        </UButton>
        <UButton
          isLoading={isPostsLoading}
          onClick={() => {dispatch(loadPosts())}}
        >
          Load Posts
        </UButton>
      </div>

    </form>
  )
}

export default PostForm