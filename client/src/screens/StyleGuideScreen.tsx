import React from 'react'
import UButton from '@/components/UI/UButton'
import ULoader from '@/components/UI/ULoader'
import UTextInput from '@/components/UI/UTextIntput'

const StyleGuideScreen = () => {
  return (
    <div className="mb-6">
      <h1 className="mb-8">StyleGuide</h1>

      <h2 className={'mb-2'}>Buttons</h2>

      <UButton className="mr-2">Default</UButton>
      <UButton disabled className="mb-2">Default</UButton>
      <br/>
      <UButton gray className="mr-2">Gray</UButton>
      <UButton gray disabled data-name="my-button">Gray</UButton>

      <br/>
      <br/>
      <br/>
      <hr className='mb-4'/>

      <h2 className={'mb-4'}>Inputs</h2>

      <div className="max-w-sm">
        <UTextInput
          label="Name"
          name="name"
          type="name" />
      </div>

      <br/>
      <hr className='mb-4'/>

      <h2 className={'mb-4'}>Loader</h2>

      <div className="max-w-xs">
        <ULoader />
      </div>

    </div>
  )
}

export default StyleGuideScreen