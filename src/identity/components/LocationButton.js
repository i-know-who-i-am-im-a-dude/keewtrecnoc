import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import { GET_LOCATION_DATA_REQUESTED } from './../actions'


class LocationButton extends Component {

  render() {
    const { location, getLocation } = this.props
    return (
      <div>
        <Button
          onClick={ !location.coord ? getLocation : null }
          disabled={ location.coord ? true : false }
        >
          { location.coord ? `You're near ${location.metroArea}` : 'Get Location' }
        </Button>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    location: state.identity.user.user_metadata.location || {}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLocation: () => dispatch({ type: GET_LOCATION_DATA_REQUESTED })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationButton)