import axios from 'axios'
import history from '../history'

//action types
const GET_USERS = 'GET_USERS'
const GOT_USER = 'GOT_USER'

//action creators
const getUsers = requestedUsers => ({
  type: GET_USERS,
  requestedUsers
})

const gotUser = requestedUser => ({type: GOT_USER, requestedUser})

//state
const initialUsers = []

//thunk
export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getUsers(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchUser = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${id}`)
    console.log('data', data)
    dispatch(gotUser(data))
  } catch (error) {
    console.log(error)
  }
}

//reducer
export default function(state = initialUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.requestedUsers
    case GOT_USER:
      return action.requestedUser
    default:
      return state
  }
}
