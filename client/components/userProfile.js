import React from 'react'
import {fetchUser} from '../store/allUsers'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ProjectListItem from './projectListItem'

class UserProfile extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id)
  }
  render() {
    console.log(this.props.user[0])
    const {user} = this.props
    if (!this.props.user[0]) {
      return <>...loading</>
    }
    if (this.props.user[0].id) {
      return (
        <div>
          <h1>{user[0].userName}'s Work</h1>
          <Link to={user[0].socialMedia}>LinkedIn</Link>
          <div className="profile-user-projects-ctn">
            {user[0].projects.map(project => {
              return (
                <div key={project.id}>
                  <Link to={`/projects/${project.id}`}>
                    <h1>{project.name}</h1>
                    <p>{project.description}</p>
                    <img src={project.imageUrl} alt="project_image" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  console.log('state', state)
  return {
    user: state.users
  }
}

const mapDispatchToPros = dispatch => {
  return {
    fetchUser: id => dispatch(fetchUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(UserProfile)
