import { call, put } from 'redux-saga/effects'

import {
  SPOTIFY_OAUTH_SUCCEEDED,
  SPOTIFY_OAUTH_FAILED,
} from './actions'

import SpotifyService from './services'

import { store } from './..'


export function* authorize(action) {
  try {
    const spotify = new SpotifyService()
    const channel = new BroadcastChannel('spotify-oauth')
    channel.onmessage = e => {
      store.dispatch({ 
        type: SPOTIFY_OAUTH_SUCCEEDED, 
        data: new URLSearchParams(e.data).get('code')
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