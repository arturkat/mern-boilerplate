import React, {useEffect} from 'react'
import {useRoutes} from 'react-router-dom'
import {allRoutes} from '@/router'

const AppRouter = () => {
  const appRoutes = useRoutes(allRoutes)

  return (
    <>
      {appRoutes}
    </>
  )
}

export default AppRouter