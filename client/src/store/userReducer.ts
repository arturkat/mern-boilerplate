const defaultState = {
  users: []
}

const ADD_USER = 'ADD_USER'
const ADD_MANY_USERS = 'ADD_MANY_USERS'
const REMOVE_USER = 'REMOVE_USER'

function reducer(state= defaultState, action) {
  switch(action.type) {
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
