import React, { Component } from 'react'
import { connect } from 'react-redux'

import { LOGIN_CALLBACK } from './../actions'


class AuthCallback extends Component {

  componentDidMount = () => {
    this.props.callback()
  }

  render() {
    return <div>Redirecting...</div>
  }
}


const mapDispatchToProps = dispatch => {
  return {
    callback: () => dispatch({ type: LOGIN_CALLBACK })
  }
}

export default connect(null, mapDispatchToProps)(AuthCallback)