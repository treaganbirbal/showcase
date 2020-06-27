import React from 'react'
import {fetchSingleProject} from '../store/singleProject'
import {connect} from 'react-redux'

class SingleProject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchSingleProject(this.props.match.params.id)
  }
  render() {
    const {project} = this.props.project
    console.log('props from singleProject', this.props)
    if (!this.props.project.project) {
      return <p>...loading</p>
    }

    return (
      <div className="singleProject-ctn">
        <h1>{project.name}</h1>
        <img src={project.imageUrl} alt="project_image" />
        <p>Applause: {project.likes}</p>
        <h3>
          About <a href={project.link}>{project.name}</a>:
        </h3>
        <p>{project.description}</p>
        <p>
          Created By: {project.user.userName},{' '}
          {project.contributors.map(conctributor => {
            return <p>{conctributor}</p>
          })}
        </p>
        <div className="comments-ctn">
          <h3>Comments</h3>
          <ul />
        </div>
      </div>
    )
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
