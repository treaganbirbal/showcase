import React from 'react'
import {fetchProjects} from '../store/allProjects'
import {connect} from 'react-redux'

class AllProjects extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchProjects()
  }
  render() {
    console.log('props from all projects', this.props)
    return <h1>All Projects</h1>
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: () => dispatch(fetchProjects())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllProjects)
