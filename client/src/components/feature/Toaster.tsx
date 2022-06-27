import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '@/store'
import {deleteToast} from '@/store/slices/toasterSlice'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5'

export const ToasterContainer = styled.div`
  .toast-enter {
    opacity: 0;
    transform: translateX(-100%);
    max-height: 0;
  }
  .toast-enter-active {
    opacity: 1;
    transform: translateX(0);
    max-height: 500px;
    transition: opacity 500ms ease-in, transform 500ms ease-in-out, max-height 500ms ease-in-out;
  }
  .toast-exit {
    opacity: 1;
    transform: translateX(0);
  }
  .toast-exit-active {
    opacity: 0;
    transform: translateX(-100%);
    transition: opacity 500ms ease-in, transform 500ms ease-in-out;
  }
`;


const Toast = ({toast}) => {

  const dispatch = useAppDispatch()
  const deleteDelay = 3000

  useEffect(() => {
    setTimeout(() => {
      dispatch(deleteToast(toast.createdAt))
    }, deleteDelay)
  })

  let classes = ``
  if (toast.type === 'error') {
    classes = `bg-red-200 text-gray-700`
  } else {
    classes = `bg-white text-gray-900`
  }

  return (
    <div key={toast.createdAt} className={`${classes} flex p-3 mb-2 overflow-hidden rounded-md shadow-md  text-sm opacity-95`}>
      <p className="grow pr-1">{toast.msg}</p>
      <div className="flex justify-end cursor-pointer">
        <IoClose onClick={() => {
          dispatch(deleteToast(toast.createdAt))
        }} />
      </div>
    </div>
  )
}

const Toaster = () => {

  const dispatch = useAppDispatch()
  const toasts = useAppSelector(state => state.toaster.toasts)

  return (
    <ToasterContainer>
      <TransitionGroup className="fixed bottom-0.5 left-2 z-20 w-full max-w-[15rem]" >
        {toasts.map((toast) => (
          <CSSTransition
            key={toast.createdAt}
            timeout={500}
            classNames="toast"
          >
            <Toast toast={toast} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ToasterContainer>
  )
}

export default Toaster