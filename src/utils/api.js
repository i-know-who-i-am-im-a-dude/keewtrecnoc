import { call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { FLUSH_STORE } from './../rootSaga'


const _protocol = 'https'
const _host = 'localhost:3000'

const auth0Routes = {
  redirect: `${_protocol}://${_host}/auth0-callback`
}

const spotifyRoutes = {
  authorize: 'https://accounts.spotify.com/authorize',
  redirect: `${_protocol}://${_host}/spotify-callback`
}

export const apiRoutes = {
  auth: auth0Routes,
  spotify: spotifyRoutes
}


export function* apiRequest(url, obj = {}) {
  obj.method = obj.method ? obj.method.toUpperCase() : 'GET'
  obj.headers = obj.headers || {}
  if (obj.method !== 'GET') {
    obj.headers['Content-Type'] = 'application/json'
  }
  obj.credentials = 'same-origin'
  if (obj.body && typeof obj.body !== 'string') {
    obj.body = JSON.stringify(obj.body)
  }
  const response = yield call(fetch, url, obj)
  const data = yield call([response, response.json])
  if (response.ok) {
    return data
  } else if (response.status === 401) {
    yield put({ type: LOGOUT_SUCCEEDED_IMPLICIT })
    yield put({ type: FLUSH_STORE })
    throw { response, data }
  } else {
    throw { response, data }
  }
}