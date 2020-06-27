import React from 'react'
import {fetchSingleProject} from '../store/singleProject'
import {connect} from 'react-redux'

class SingleProject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchSingleProject(1)
  }
  render() {
    console.log('props from singleProject', this.props)
    return <h1>SingleProject</h1>
  }
}

const mapStateToProps = state => {
  return {project: state.project}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProject: id => dispatch(fetchSingleProject(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProject)
