import React from 'react'

const ULink = ({children, className, ...props}) => {
  let classes = `text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-white `
  if (className) {
    classes += className
  }

  return (
    <a {...props} className={classes}>
      <span>{children}</span>
    </a>
  )
}

export default ULink