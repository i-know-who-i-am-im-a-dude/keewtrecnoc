import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import { SESSION_REQUESTED } from './../../session/actions'
import Layout from './..'


const HomePage = props => {
  console.log('rendering, HomePage')
  return (
    <Layout hideNav={true}>
      Home Page!
      <Link to='/login'>Login!</Link>
    </Layout>
  )
}


class Home extends Component {

  render() {
    switch(this.props.activeSession) {
      case null:
        return null
      case true:
        return <Redirect to='/dash' />
      case false:
        return <HomePage />
    }
  }
}

const mapStateToProps = state => {
  return {
    activeSession: state.session.activeSession
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkForSession: () => dispatch({ type: SESSION_REQUESTED })
  }
}

export default connect(mapStateToProps)(Home)