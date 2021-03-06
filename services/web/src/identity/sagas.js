import { call, put, select } from 'redux-saga/effects'

import { AuthService, UserService } from 'mcw-identity'
import { SongkickService } from 'mcw-events'

import {
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  LOGOUT_SUCCEEDED, 
  LOGOUT_FAILED,
  GET_USER_DATA_REQUESTED,
  GET_USER_DATA_SUCCEEDED,
  GET_USER_DATA_FAILED,
  UPDATE_USER_DATA_REQUESTED,
  UPDATE_USER_DATA_SUCCEEDED,
  UPDATE_USER_DATA_FAILED, 
  GET_LOCATION_DATA_SUCCEEDED, 
  GET_LOCATION_DATA_FAILED
} from './actions'


export function* login(action) {
  try {
    const authService = new AuthService()
    const data = yield call(authService.login, process.env.LOGIN_CALLBACK)
    yield put({ type: LOGIN_SUCCEEDED, data })
    yield put({ type: GET_USER_DATA_REQUESTED })
  }
  catch (err) {
    yield put({ type: LOGIN_FAILED, err })
  }
}

export function* loginCallback(action) {
  try {
    const authService = new AuthService()
    yield call(authService.loginCallback)
  }
  catch (err) {
    yield put({ type: LOGIN_FAILED, err: err.message })
  }
}

export function* logout(action) {
  try {
    const authService = new AuthService()
    yield call(authService.logout, process.env.LOGOUT_REDIRECT)
    yield put({ type: LOGOUT_SUCCEEDED })
  }
  catch (err) {
    yield put({ type: LOGOUT_FAILED, err: err.message })
  }
}

export function* getUserMetadata(action) {
  try {
    const { userID, accessToken } = yield select(store => store.identity.auth)
    const userService = new UserService(userID, accessToken)
    const data = yield call(userService.getMetadata)
    yield put({ type: GET_USER_DATA_SUCCEEDED, data })
  }
  catch (err) {
    yield put({ type: GET_USER_DATA_FAILED, err: err.message })
  }
}

export function* updateUserMetadata(action) {
  try {
    const { userID, accessToken } = yield select(store => store.identity.auth)
    const userService = new UserService(userID, accessToken)
    const data = yield call(userService.updateMetadata, action.data)
    yield put({ type: UPDATE_USER_DATA_SUCCEEDED, data })
  }
  catch (err) {
    yield put({ type: UPDATE_USER_DATA_FAILED, err: err.message })
  }
}

export function* getLocation(action) {
  try {
    const { userID, accessToken } = yield select(store => store.identity.auth)
    const userService = new UserService(userID, accessToken)
    const location = yield call(() => new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(pos => {
        resolve({
          location: {
            coord: {
              latitude: pos.coords.latitude, 
              longitude: pos.coords.longitude 
            }
          }
        })
      })
    }))
    const songkick = new SongkickService()
    const { latitude, longitude } = location.location.coord
    const metro = yield call(songkick.getMetro.bind(songkick), latitude, longitude)
    location.location.metro = metro
    yield put({ type: GET_LOCATION_DATA_SUCCEEDED, data: location })
    yield put({ type: UPDATE_USER_DATA_REQUESTED, data: location })
  }
  catch (err) {
    yield put({ type: GET_LOCATION_DATA_FAILED, err: err.message })
  }
}