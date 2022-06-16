import {createSlice, PayloadAction} from '@reduxjs/toolkit'

// Define a type for the slice state
export interface CounterState {
  value: number
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const {increment, decrement, incrementByAmount} = counterSlice.actions

export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}

export default counterSlice.reducer
