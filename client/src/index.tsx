import React, {useEffect} from 'react'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'

import './styles'

import App from './App'
import {store} from './store'

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(
  <Provider store={store}>
    {/*<React.StrictMode>*/}
      <App />
    {/*</React.StrictMode>*/}
  </Provider>
)
