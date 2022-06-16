import React from 'react'
import StyleGuideScreen from './StyleGuideScreen'
import CounterScreen from './CounterScreen'
import AuthScreen from './AuthScreen'

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