import React from 'react'

const GridsScreen = () => {
  return (
    <div>
      <h1 className={'mb-6'}>Grid Screen</h1>

      <h2 className={'mb-2'}></h2>
      <div className={'grid'}
           style={{
             gridAutoFlow: 'row',
             gap: '1rem',
             gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
           }}
      >
        <div className={'shadow rounded bg-white p-4'}>
          1 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi dignissimos ipsam odit quod reprehenderit.
        </div>
        <div className={'shadow rounded bg-white p-4'}>2</div>
        <div className={'shadow rounded bg-white p-4'}>
          3 - Lorem ipsum dolor sit amet.
        </div>
        <div className={'shadow rounded bg-white p-4'}>4</div>
        <div className={'shadow rounded bg-white p-4'}>
          5 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci ducimus ea eius error, harum illum nesciunt odio quam temporibus, velit voluptas voluptate. Blanditiis consequatur esse eveniet neque obcaecati tempora veritatis!
        </div>
      </div>
    </div>
  )
}

export default GridsScreen


// https://medium.com/@stasonmars/%D0%BA%D0%B0%D0%BA-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%8E%D1%82-auto-fill-%D0%B8-auto-fit-%D0%B2-css-grid-7d903a6c678e
