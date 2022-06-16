import React, {useState, useContext} from 'react'
import AuthService from '../services/AuthService'
import {useDispatch, useSelector} from 'react-redux'
import {addUserAction, removeUserAction} from '../store/userReducer'
import {fetchManyUsers, loginUser, logoutUser, signupUser, authedUser, refreshUser} from '../store/async/userAsyncActions'

const Form = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  // @ts-ignore
  const count = useSelector((state) => state.counter.count)
  // @ts-ignore
  const users = useSelector(state => state.user.users)

  function addUser(name) {
    const user = {
      name: name,
      id: Date.now()
    }
    dispatch(addUserAction(user))
  }

  function removeUser(user) {
    dispatch(removeUserAction(user))
  }

  function addManyUsers() {
    // @ts-ignore
    dispatch(fetchManyUsers())
  }

  return (
    <>

      <h1>count: {count}</h1>
      <button onClick={() => dispatch({type: 'PLUS', payload: Number(prompt())})}>Count +</button>

      <hr/>
      <h1>Users</h1>
      <button onClick={() => addUser(prompt())} style={{fontSize:'1rem'}}>Add User</button>
      <br/>
      <button onClick={() => addManyUsers()} style={{fontSize:'1rem'}}>Add Many Users</button>
      {users.length > 0
        ?
        users.map((user) => {
          return <div key={user.id} style={{fontSize:'1.2rem'}} onClick={() => removeUser(user)}>{user.name}</div>
        })
        :
        <p>There is no users</p>
      }


      <br/>

      <form onSubmit={e => e.preventDefault()}>
        <fieldset>
          <legend>LOGIN ajax</legend>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {/* @ts-ignore */}
          <button onClick={() => dispatch(loginUser(email, password))}>
            Log In
          </button>
          {/* @ts-ignore */}
          <button onClick={() => dispatch(signupUser(email, password))}>
            Sign Up
          </button>
          {/* @ts-ignore */}
          <button onClick={() => dispatch(logoutUser(email, password))}>
            Log Out
          </button>
          {/* @ts-ignore */}
          <button onClick={() => dispatch(authedUser())}>
            Authed
          </button>
          {/* @ts-ignore */}
          <button onClick={() => dispatch(refreshUser())}>
            Refresh
          </button>
        </fieldset>
      </form>

      <br/>

      <form action="http://localhost:8000/login" method={'POST'}>
        <fieldset>
          <legend>LOGIN</legend>
          <input type="text" name="email" placeholder={'email'}/>
          <br/>
          <input type="text" name="password" placeholder={'password'}/>
          <br/>
          <button type={'submit'}>Submit</button>
        </fieldset>
      </form>

      <br/>

      <form action="http://localhost:8000/authed" method={'POST'}>
        <fieldset>
          <legend>AUTHED</legend>
          <button type={'submit'}>Submit</button>
        </fieldset>
      </form>
    </>
  )
}

export default Form
