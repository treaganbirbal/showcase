import React from 'react'
import {fetchSingleProject} from '../store/singleProject'
import {fetchUsers} from '../store/allUsers'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class SingleProject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchSingleProject(this.props.match.params.id)
    this.props.fetchUsers()
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
        <p>
          Applause: {project.likes} <span>-</span> <span>+</span>
        </p>
        <h3>
          About <a href={project.link}>{project.name}</a>:
        </h3>
        <p>{project.description}</p>
        <p>
          Created By: {project.user.userName}{' '}
          <Link to={project.user.socialMedia}>LinkedIN</Link>
          {project.contributors.map((contributor, i) => {
            return <li key={i}>{contributor}</li>
          })}
        </p>
        <div className="comments-ctn">
          <h3>Comments</h3>
          {project.comments.map(comment => {
            return <li>{comment.comment}</li>
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    project: state.project,
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProject: id => dispatch(fetchSingleProject(id)),
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProject)
