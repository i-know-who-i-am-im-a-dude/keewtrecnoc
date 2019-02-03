import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SpotifyOAuthButton } from './../../spotify'
import Layout from './..'


class Home extends Component {

  render() {
    const { user } = this.props
    return (
      <Layout>
        Home Page!
        { user ? <SpotifyOAuthButton /> : null }
      </Layout>
    )
  }
}


const mapStateToProps = state => {
  return {
    user: state.identity.user
  }
}

export default connect(mapStateToProps)(Home)