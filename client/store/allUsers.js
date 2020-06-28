import axios from 'axios'
import history from '../history'

//action types
const GET_USERS = 'GET_USERS'

//action creators
const getUsers = requestedUsers => ({
  type: GET_USERS,
  requestedUsers
})

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

//reducer
export default function(state = initialUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.requestedUsers
    default:
      return state
  }
}
