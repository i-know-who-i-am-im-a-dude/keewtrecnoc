import { 
  put, 
  select, 
  takeEvery, 
  takeLatest 
} from 'redux-saga/effects'

import { 
  login, 
  loginCallback, 
  logout, 
  getUserMetadata, 
  updateUserMetadata 
} from './identity/sagas'
import {  
  LOGIN_REQUESTED, 
  LOGIN_CALLBACK, 
  LOGOUT_REQUESTED, 
  GET_USER_DATA_REQUESTED, 
  UPDATE_USER_DATA_REQUESTED
} from './identity/actions'

import {
  authorize, 
  authorizationCallback
} from './spotify/sagas'

import {
  SPOTIFY_OAUTH_REQUESTED,
  SPOTIFY_OAUTH_CALLBACK
} from './spotify/actions'


export default function* rootSaga() {
  /*
    First saga that will run following app initialization
  */
  yield takeLatest(LOGIN_REQUESTED, login)
  yield takeLatest(LOGIN_CALLBACK, loginCallback)
  yield takeLatest(LOGOUT_REQUESTED, logout)
  yield takeLatest(GET_USER_DATA_REQUESTED, getUserMetadata)
  yield takeLatest(UPDATE_USER_DATA_REQUESTED, updateUserMetadata)
  yield takeLatest(SPOTIFY_OAUTH_REQUESTED, authorize)
  yield takeLatest(SPOTIFY_OAUTH_CALLBACK, authorizationCallback)
}