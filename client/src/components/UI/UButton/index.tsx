import React, {FC, ReactNode} from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/../tailwind.config.js'
import Ripple from './Ripple'
import './ubutton.scss'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

const fullConfig = resolveConfig(tailwindConfig)

interface ButtonProps {
  children?: ReactNode
  className?: string
  gray?: boolean
  isLoading?: boolean
  disabled?: boolean
  [props:string]: Object
}

const UButton: FC<ButtonProps> = ({
  children,
  className='',
  gray=false,
  isLoading=false,
  disabled=false,
  ...props
}) => {

  let classes = `btn--pop-anim disabled:opacity-50 `

  if (gray) {
    classes += `
      relative
      px-5
      py-2.5
      rounded-lg
      overflow-hidden
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
      relative
      px-5
      py-2.5
      rounded-lg
      overflow-hidden
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

  let isDisabled = false;
  if (disabled || isLoading) {
    isDisabled = true
  }

  return (
    <button {...props} disabled={isDisabled} type="button" className={classes} >
      <div className={isLoading ? 'opacity-20':''}>{children}</div>
      {isLoading &&
        <div className="absolute inset-0 z-10 flex justify-center items-center bg-white-500/90"><AiOutlineLoading3Quarters className={'animate-spin'} size={'1.2rem'} /></div>}
      {!isDisabled && <div className={isDisabled ? 'pointer-events-none':''}><Ripple color={fullConfig.theme.colors.gray['50']} duration={1500} /></div>}
    </button>
  )
}

export default UButton
