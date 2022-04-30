import {addManyUsers} from '../userReducer'

export function fetchManyUsers() {
  return function (dispatch, getState) {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => dispatch(addManyUsers(json)))
    // console.log('state:', getState())
  }
}
