import React, {FC, ReactNode} from 'react'

interface ButtonProps {
  children?: ReactNode
  className?: string
  gray?: boolean
  [props:string]: Object
}

const UButton: FC<ButtonProps> = ({
  children,
  className='',
  gray=false,
  ...props
}) => {

  let classes = `btn--pop-anim disabled:opacity-50`
  if (gray) {
    classes += `
      px-5
      py-2.5
      rounded-lg
      text-gray-50
      bg-gray-500
      text-sm
      font-medium
      tracking-wide
      uppercase
      hover:bg-gray-700
      focus:hover:outline-gray-700
      focus:outline-gray-500
      focus:outline
      focus:outline-2
      focus:outline-offset-2
      disabled:hover:bg-gray-500
      dark:text-gray-100
      dark:bg-gray-800
      dark:hover:bg-gray-700
      dark:focus:hover:outline-gray-700
      dark:focus:outline-gray-800
    `
  } else {
    classes += `
      px-5
      py-2.5
      rounded-lg
      text-gray-50
      bg-indigo-500
      text-sm
      font-medium
      tracking-wide
      uppercase
      hover:bg-indigo-700
      focus:hover:outline-indigo-700
      focus:outline-indigo-500
      focus:outline
      focus:outline-2
      focus:outline-offset-2
      disabled:hover:bg-indigo-500
      dark:text-gray-100
      dark:bg-indigo-800
      dark:hover:bg-indigo-700
      dark:focus:hover:outline-indigo-700
      dark:focus:outline-indigo-800
    `
  }
  if (className) {
    classes += className;
  }

  return (
    <button {...props} type="button" className={classes}>
      {children}
    </button>
  )
}

export default UButton
