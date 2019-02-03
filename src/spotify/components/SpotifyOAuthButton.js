import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SPOTIFY_OAUTH_REQUESTED } from './../actions'


class SpotifyOAuthButton extends Component {

  render() {
    const { spotify } = this.props
    return (
      <Button 
        size='big'
        disabled={ spotify.connection ? true : false }
        onClick={ !spotify.connection ? authorize : null }
        content={ !spotify.connection ? 'Connect' : 'Connected' }
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    spotify: state.spotify
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authorize: () => dispatch({ type: SPOTIFY_OAUTH_REQUESTED })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyOAuthButton)