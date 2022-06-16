import React from 'react'
import type { RouteObject } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import ContentLayout from '../components/layout/ContentLayout'
import RootScreen from '../components/screens/RootScreen'
import CounterScreen from '../components/screens/CounterScreen'
import StyleGuideScreen from '../components/screens/StyleGuideScreen'
import AuthScreen from '../components/screens/AuthScreen'
import NotFoundScreen from '../components/screens/NotFoundScreen'
import PrivateScreen from '../components/screens/PrivateScreen'
import {Navigate, useLocation} from 'react-router-dom'
import {useAppSelector} from '../store'

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const authState = useAppSelector(state => state.auth)
  const location = useLocation();

  if (!authState.isAuth) {
    // Redirect them to the /login page, but save the current location they were trying to go to when they were redirected.
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}

export const allRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ContentLayout/>,
    children: [
      {
        index: true,
        element: <RootScreen/>,
      },
      {
        path: 'auth',
        element: <AuthScreen />,
      },
      {
        path: 'private',
        element: <RequireAuth><PrivateScreen /></RequireAuth>,
      },
      {
        path: 'private2',
        element: <RequireAuth><PrivateScreen /></RequireAuth>,
      },
      {
        path: 'counter',
        element: <CounterScreen />,
      },
      {
        path: 'styleguide',
        element: <StyleGuideScreen />,
      },
      {
        path: '*',
        element: <NotFoundScreen/>,
      },
    ]
  }
]
