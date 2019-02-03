import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'

import { SPOTIFY_OAUTH_REQUESTED } from './../actions'


class SpotifyOAuthButton extends Component {

  render() {
    const { spotify, authorize } = this.props
    return (
      <Button 
        size='big'
        disabled={ spotify.connection ? true : false }
        onClick={ !spotify.connection ? authorize : null }
      >
        <Icon size='big' name='spotify' /> 
        { spotify.connection ? 'Connected' : 'Connect' }
      </Button>
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