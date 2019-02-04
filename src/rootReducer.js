import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import identityReducer from './identity/reducers'
import spotifyReducer from './spotify/reducers'

export default combineReducers({
  router: routerReducer, 
  identity: identityReducer, 
  spotify: spotifyReducer
})