import {
  SPOTIFY_OAUTH_SUCCEEDED,
  SPOTIFY_OAUTH_FAILED
} from './actions'

import SpotifyService from 'mcw-playlists'


const initialState = {}


export default function spotifyReducer(state = initialState, action) {
  switch(action.type) {

    case SPOTIFY_OAUTH_SUCCEEDED:
      return Object.assign({}, state, {})

    case SPOTIFY_OAUTH_FAILED:
      return Object.assign({}, state, { err: action.err })

    default:
      return state
  }
}