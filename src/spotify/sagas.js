import { call, put } from 'redux-saga/effects'

import {
  SPOTIFY_OAUTH_SUCCEEDED,
  SPOTIFY_OAUTH_FAILED,
} from './actions'

import { UPDATE_USER_DATA_REQUESTED } from './../identity/actions'

import SpotifyService from './services'

import { store } from './..'


export function* authorize(action) {
  try {
    const spotify = new SpotifyService()
    const channel = new BroadcastChannel('spotify-oauth')
    channel.onmessage = e => {
      const token = new URLSearchParams(e.data).get('code')
      store.dispatch({ 
        type: SPOTIFY_OAUTH_SUCCEEDED, 
        data: token
      })
      store.dispatch({
        type: UPDATE_USER_DATA_REQUESTED,
        data: { spotify: { token: token } }
      })
    }
    yield call(window.open, spotify.authorizationUrl, '_blank')
  }
  catch (err) {
    yield put({ type: SPOTIFY_OAUTH_FAILED, err: err.message })
  }
}

export function* authorizationCallback(action) {
  try {
    const channel = new BroadcastChannel('spotify-oauth')
    channel.postMessage(window.location.search)
    window.close()
  }
  catch (err) {
    yield put({ type: SPOTIFY_OAUTH_FAILED, err: err.message })
  }
}