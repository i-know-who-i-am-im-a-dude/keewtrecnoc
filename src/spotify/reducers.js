import {
  SPOTIFY_OAUTH_SUCCEEDED,
  SPOTIFY_OAUTH_FAILED
} from './actions'

import SpotifyService from './services'


const initialState = { 
  connection: null 
}


export default function spotifyReducer (state = initialState, action) {
  switch(action.type) {

    case SPOTIFY_OAUTH_SUCCEEDED:
      return Object.assign({}, state, { connection: action.data })

    case SPOTIFY_OAUTH_FAILED:
      return Object.assign({}, state, { auth: null, err: action.err })

    default:
      return state
  }
}