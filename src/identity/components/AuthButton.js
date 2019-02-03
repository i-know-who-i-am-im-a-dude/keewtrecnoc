import React, { Component } from 'react'
import { connect } from 'react-redux'


class AuthButton extends Component {

  render() {
    const { auth, login, logout } = this.props
    return (
      <Button 
        size={'big'}
        onClick={ auth ? logout : login }
        content={ auth ? 'Logout' : 'Login' }
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.identity.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch({ type: LOGIN_REQUESTED }),
    logout: () => dispatch({ type: LOGOUT_REQUESTED })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton)