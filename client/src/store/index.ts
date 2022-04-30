import {legacy_createStore as createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from '@redux-devtools/extension'

import counterReducer from './counterReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store

// console.log(store)
// console.log(store.getState())
// store.subscribe(() => console.log(store.getState()))
// store.dispatch({type: 'PLUS'} )
