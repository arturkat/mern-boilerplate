const defaultState = {
  users: [],
  user: {},
  isAuth: false,
  isLoading: false
}

const ADD_USER = 'ADD_USER'
const SET_AUTH = 'SET_AUTH'
const SET_LOADING = 'SET_LOADING'
const SET_USER = 'SET_USER'
const ADD_MANY_USERS = 'ADD_MANY_USERS'
const REMOVE_USER = 'REMOVE_USER'

function reducer(state= defaultState, action) {
  switch(action.type) {
    case SET_USER:
      return {...state, user: action.payload}
    case SET_AUTH:
      return {...state, isAuth: action.payload}
    case SET_LOADING:
      return {...state, isLoading: action.payload}
    case ADD_USER:
      return {...state, users: [...state.users, action.payload]}
    case ADD_MANY_USERS:
      return {...state, users: [...state.users, ...action.payload]}
    case REMOVE_USER:
      return {...state, users: state.users.filter(user => {
        return user.id !== action.payload.id
      })}
    default:
      return state
  }
}

export function setLoading(bool) {
  return {type: SET_LOADING, payload: bool}
}

export function setAuth(bool) {
  return {type: SET_AUTH, payload: bool}
}

export function setUser(user) {
  return {type: SET_USER, payload: user}
}

export function addUserAction(user) {
  return {type: ADD_USER, payload: user}
}

export function addManyUsers(payload) {
  return {type: ADD_MANY_USERS, payload}
}

export function removeUserAction(user) {
  return {type: REMOVE_USER, payload: user}
}

export default reducer
