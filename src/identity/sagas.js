import { push } from 'react-router-redux'
import { call, put } from 'redux-saga/effects'

import { apiRoutes } from './../utils'

import { AuthService, UserService } from './services'

import {
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  LOGOUT_SUCCEEDED, 
  LOGOUT_FAILED,
  GET_USER_DATA_REQUESTED,
  GET_USER_DATA_SUCCEEDED,
  GET_USER_DATA_FAILED,
  UPDATE_USER_DATA_SUCCEEDED,
  UPDATE_USER_DATA_FAILED
} from './actions'


export function* login(action) {
  try {
    const authService = new authService()
    yield call(authService.login)
    yield put({ type: LOGIN_SUCCEEDED, data: action.data })
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
    yield put({ type: LOGIN_FAILED, err })
  }
}

export function* logout(action) {
  try {
    const authService = new AuthService()
    yield call(authService.logout)
    yield put({ type: LOGOUT_SUCCEEDED })
  }
  catch (err) {
    yield put({ type: LOGOUT_FAILED, err })
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
    yield put({ type: GET_USER_DATA_FAILED, err })
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
    yield put({ type: UPDATE_USER_DATA_FAILED, err })
  }
}