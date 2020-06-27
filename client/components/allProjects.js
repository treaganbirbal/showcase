import React from 'react'
import {fetchProjects} from '../store/allProjects'
import {connect} from 'react-redux'

import ProjectListItem from './projectListItem'

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
    return (
      <div className="allProjects-ctn">
        <h1 className="">PROJECTS</h1>
        <ProjectListItem
          className="project-item"
          projects={this.props.projects}
        />
      </div>
    )
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
