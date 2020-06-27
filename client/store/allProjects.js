import axios from 'axios'
import history from '../history'

//action types
const GET_PROJECTS = 'GET_PROJECTS'

//action creators
const getProjects = requestedProjects => ({
  type: GET_PROJECTS,
  requestedProjects
})

//state
const initialProjects = []

//thunk

export const fetchProjects = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/projects')
      dispatch(getProjects(data || initialProjects))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer

export default function(state = initialProjects, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return action.requestedProjects
    default:
      return state
  }
}
