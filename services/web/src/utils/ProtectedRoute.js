import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'


const ProtectedRoute = ({ component: Component, ...rest }) => {
  let comp
  if (rest.auth) {
    comp = props => <Component {...props} />
  } else {
    comp = props => <Redirect to={{ 
      pathname: '/', 
      state: { from: props.location }
    }} />
  }
  return <Route {...rest} render={comp} />
}

const mapStateToProps = state => {
  return {
    auth: state.identity.auth
  }
}

export default connect(mapStateToProps)(ProtectedRoute)