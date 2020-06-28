import axios from 'axios'
import history from '../history'

//action types
const GET_COMMENTS = 'GET_COMMENTS'

//action creators
const getComments = requestedComments => ({
  type: GET_COMMENTS,
  requestedComments
})

//state
const initialComments = []

//thunk
export const fetchComments = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/comments')
      dispatch(getComments(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer
export default function(state = initialComments, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return axios.requestedComments
    default:
      return state
  }
}
