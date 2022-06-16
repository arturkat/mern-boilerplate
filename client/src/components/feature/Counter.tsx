import React from 'react'
import {useAppSelector, useAppDispatch} from '../../store'
import {increment, decrement, incrementAsync} from '../../store/slices/counterSlice'
import UButton from '../UI/UButton'

const Counter = () => {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div>
      <h3 className="mb-4 text-center">
        Counter: {count}
      </h3>
      <div className="grid grid-flow-col-dense gap-2">
        <UButton onClick={() => dispatch(increment())}>
          Increment
        </UButton>
        <UButton onClick={() => dispatch(decrement())}>
          Decrement
        </UButton>
        <UButton onClick={() => dispatch(incrementAsync(1))}>
          Increment Async
        </UButton>
      </div>
    </div>
  )
}

export default Counter