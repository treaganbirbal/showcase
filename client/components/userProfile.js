import React from 'react'
import {fetchUser} from '../store/user'
import {connect} from 'react-redux'

class UserProfile extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id)
  }
  render() {
    return <h1>Profile</h1>
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToPros = dispatch => {
  return {
    fetchUser: id => dispatch(fetchUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(UserProfile)
