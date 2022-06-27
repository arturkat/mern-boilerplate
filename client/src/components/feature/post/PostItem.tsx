import React, {useState} from 'react'
import UButton from '@comp/UI/UButton'
import {FaRegTrashAlt} from 'react-icons/fa'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {useAppDispatch, useAppSelector} from '@/store'
import {deletePostAsync} from '@/store/slices/postsSlice'

const PostItem = ({post}) => {

  const dispatch = useAppDispatch()

  const [isPostLoading, setIsPostLoading] = useState(false)

  return (
    <div className={`card grid mb-2`} >
      <h4 className={'mb-2'}>{post.title}</h4>
      {post.body && <p className={'mb-2'}>{post.body}</p>}
      <div className="grid mb-2">
        <small>_id: {post._id}</small>
        <small>userId: {post.userId}</small>
        <small>isDummy: {String(post.isDummy)}</small>
      </div>
      <div className="flex self-end">
        <UButton gray
                 className={'w-auto'}
                 isLoading={isPostLoading}
                 onClick={async () => {
                   setIsPostLoading(true)
                   await dispatch(deletePostAsync(post._id))
                   setIsPostLoading(false)
                 }}
        >
          <FaRegTrashAlt size={'1.2rem'} />
        </UButton>
      </div>
    </div>
  )
}

export default PostItem