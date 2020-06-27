import axios from 'axios'
import history from '../history'

//action types
const GET_PROJECT = 'GET_PROJECT'

//action creators
const getProject = requestedProject => ({
  type: GET_PROJECT,
  requestedProject
})

//state
const initialProject = []

//thunk
export const fetchSingleProject = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/projects/${id}`)
      dispatch(getProject(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer
export default function(state = initialProject, action) {
  switch (action.type) {
    case GET_PROJECT:
      return {...state, project: action.requestedProject}
    default:
      return state
  }
}
