import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'


const ProtectedRoute = ({ component: Component, ...rest }) => {
  let comp
  if (rest.activeSession) {
    comp = props => <Component {...props} />
  } else {
    comp = props => <Redirect to={{ 
      pathname: '/login', 
      state: { from: props.location }
    }} />
  }
  return <Route {...rest} render={comp} />
}

const mapStateToProps = state => {
  return {
    activeSession: state.session.activeSession
  }
}

export default connect(mapStateToProps)(ProtectedRoute)