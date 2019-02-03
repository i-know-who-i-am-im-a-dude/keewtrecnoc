import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SPOTIFY_OAUTH_CALLBACK } from './../actions'


class SpotifyCallback extends Component {

  componentDidMount = () => {
    this.props.callback()
  }

  render() {
    return <div>Redirecting...</div>
  }
}

const mapStateToProps = state => {
  return {
    spotify: state.spotify
  }
}

const mapDispatchToProps = dispatch => {
  return {
    callback: () => dispatch({ type: SPOTIFY_OAUTH_CALLBACK })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyCallback)