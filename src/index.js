import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import createHistory from 'history/createBrowserHistory'


import Home from './views/Home'

import { PrivateRoute } from './utils'

import rootReducer from './rootReducer'

const sagaMiddleware = createSagaMiddleware()

export const history = createHistory()

const middleware = [
  sagaMiddleware, 
  routerMiddleware(history)
]

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth0-callback" component={AuthCallback} />
          <PrivateRoute exact path="/spotify-callback" component={SpotifyOAuthCallback} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root')
)