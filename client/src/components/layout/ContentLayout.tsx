import React from 'react'
import NavBar from './NavBar'
import {Outlet} from 'react-router-dom'

const ContentLayout = () => {
  return (
    <>
      <NavBar />
      <main className="w-full max-w-screen-xl mx-auto px-4 pb-4">
        <Outlet />
      </main>
    </>
  )
}

export default ContentLayout