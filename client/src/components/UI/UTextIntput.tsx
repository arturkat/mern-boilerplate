import React, {useId} from 'react'

const TextInput = ({
  name='',
  type='text',
  label='',
  ...props
}) => {
  const id = useId();

  return (
    <div className="relative">
      <input type={type}
             name={name}
             id={id}
             placeholder=" "
             className="
               block
               rounded-t-lg
               px-2.5
               pb-2.5
               pt-5
               w-full
               text-sm
               text-gray-900
               bg-gray-50
               dark:bg-gray-700
               border-0
               border-b-2
               border-gray-300
               appearance-none
               dark:text-white
               dark:border-gray-600
               dark:focus:border-indigo-500
               focus:outline-none
               focus:ring-0
               focus:border-indigo-600
               peer
             "
             {...props}
      />
      {
        label &&
          <label htmlFor={id}
                 className="
                   absolute
                   text-sm
                   text-gray-500
                   dark:text-gray-400
                   duration-300
                   transform
                   -translate-y-4
                   scale-75
                   top-4
                   z-10
                   origin-[0]
                   left-2.5
                   peer-focus:text-indigo-600
                   peer-focus:dark:text-indigo-500
                   peer-placeholder-shown:scale-100
                   peer-placeholder-shown:translate-y-0
                   peer-focus:scale-75
                   peer-focus:-translate-y-4
                 "
          >
            {label}
          </label>
      }
    </div>
  )
}

export default TextInput




