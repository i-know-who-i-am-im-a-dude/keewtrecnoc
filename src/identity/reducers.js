import {
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  LOGOUT_SUCCEEDED, 
  LOGOUT_FAILED,
  GET_USER_DATA_SUCCEEDED,
  GET_USER_DATA_FAILED,
  UPDATE_USER_DATA_SUCCEEDED,
  UPDATE_USER_DATA_FAILED
} from './actions'


const initialState = { 
  auth: null, 
  user: null
}


export default function identityReducer (state = initialState, action) {
  switch(action.type) {

    case LOGIN_SUCCEEDED:
      action.data.userID = action.data.idTokenPayload.sub
      return Object.assign({}, state, { auth: action.data })

    case LOGIN_FAILED:
      return Object.assign({}, state, { auth: null, err: action.err })
    
    case LOGOUT_SUCCEEDED:
      return Object.assign({}, state, { auth: null })

    case LOGOUT_FAILED:
      return Object.assign({}, state, { err: action.err })


    case GET_USER_DATA_SUCCEEDED:
      return Object.assign({}, state, { user: action.data })

    case GET_USER_DATA_FAILED:
      return Object.assign({}, state, { err: action.err })

    case UPDATE_USER_DATA_SUCCEEDED:
      return Object.assign({}, state, { user: action.data })

    case UPDATE_USER_DATA_FAILED:
      return Object.assign({}, state, { err: action.err })


    default:
      return state
  }
}