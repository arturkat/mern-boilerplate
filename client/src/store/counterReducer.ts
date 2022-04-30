const defaultState = {
  count: 0
}

function reducer(state= defaultState, action) {
  switch(action.type) {
    case 'PLUS':
      return {...state, count: state.count + action.payload}
    default:
      return state
  }
}

export default reducer
