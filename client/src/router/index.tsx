import React from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import {useAppSelector} from '@/store'
import ULoader from '@/components/UI/ULoader'
import ContentLayout from '@/components/layout/ContentLayout'

// Lazy loaded screens
const AboutScreenLazy = React.lazy(() => import('../components/screens/AboutScreen'))
const RootScreenLazy = React.lazy(() => import('../components/screens/RootScreen'))
const AuthScreenLazy = React.lazy(() => import('../components/screens/AuthScreen'))
const PostsScreenLazy = React.lazy(() => import('../components/screens/PostsScreen'))
const GridsScreenLazy = React.lazy(() => import('../components/screens/GridsScreen'))
const CounterScreenLazy = React.lazy(() => import('../components/screens/CounterScreen'))
const StyleGuideScreenLazy = React.lazy(() => import('../components/screens/StyleGuideScreen'))
const PrivateScreenLazy = React.lazy(() => import('../components/screens/PrivateScreen'))
const NotFoundScreenLazy = React.lazy(() => import('../components/screens/NotFoundScreen'))

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const authState = useAppSelector(state => state.auth)
  const location = useLocation();

  if (!authState.isAuth) {
    // Redirect them to the /auth page, but save the current location they were trying to go to when they were redirected.
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
        element: <React.Suspense fallback={<ULoader/>}> <RootScreenLazy/> </React.Suspense>,
      },
      {
        path: 'auth',
        element: <React.Suspense fallback={<ULoader/>}> <AuthScreenLazy /> </React.Suspense>,
      },
      {
        path: 'counter',
        element: <React.Suspense fallback={<ULoader/>}> <CounterScreenLazy /> </React.Suspense>,
      },
      {
        path: 'styleguide',
        element: <React.Suspense fallback={<ULoader/>}> <StyleGuideScreenLazy /> </React.Suspense>,
      },
      {
        path: 'about',
        element: <React.Suspense fallback={<ULoader/>}> <AboutScreenLazy /> </React.Suspense>,
      },
      {
        path: 'grids',
        element: <React.Suspense fallback={<ULoader/>}> <GridsScreenLazy /> </React.Suspense>,
      },
      {
        path: 'posts',
        element: <React.Suspense fallback={<ULoader/>}> <PostsScreenLazy /> </React.Suspense>,
      },
      {
        path: 'private',
        element:
          <RequireAuth>
            <React.Suspense fallback={<ULoader/>}> <PrivateScreenLazy /> </React.Suspense>
          </RequireAuth>,
      },
      {
        path: 'private2',
        element:
          <RequireAuth>
            <React.Suspense fallback={<ULoader/>}> <PrivateScreenLazy /> </React.Suspense>
          </RequireAuth>,
      },
      {
        path: '*',
        element: <React.Suspense fallback={<ULoader/>}> <NotFoundScreenLazy/> </React.Suspense>,
      },
    ]
  }
]
