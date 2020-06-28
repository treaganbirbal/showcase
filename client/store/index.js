import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import users from './allUsers'
import projects from './allProjects'
import project from './singleProject'
import comments from './allComments'

const reducer = combineReducers({user, projects, project, comments, users})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './allProjects'
export * from './singleProject'
export * from './allComments'
export * from './allUsers'
