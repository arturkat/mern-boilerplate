import React from 'react'
import StyleGuideScreen from './StyleGuideScreen'
import CounterScreen from './CounterScreen'
import AuthScreen from './AuthScreen'
import PostsScreen from './PostsScreen'

const RootScreen = () => {
  return (
    <>
      <StyleGuideScreen/>
      <CounterScreen/>
      <AuthScreen />
    </>
  )
}

export default RootScreen