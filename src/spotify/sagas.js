
import {
  SPOTIFY_OAUTH_SUCCEEDED,
  SPOTIFY_OAUTH_FAILED,
} from './actions'

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
    yield put({ SPOTIFY_OAUTH_FAILED, err})
  }
}

export function* authorizationCallback(action) {
  try {
    const channel = new BroadcastChannel('spotify-oauth')
    yield call(channel.postMessage, window.location.search)
    yield call(window.close)
  }
  catch (err) {
    yield put({ SPOTIFY_OAUTH_FAILED, err})
  }
}