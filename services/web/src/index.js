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
// import '<link rel="stylesheet" href="https://use.typekit.net/sov6ttd.css">'
import './styles/app.scss';

import Home from './views/Home'
import { AuthCallback } from './identity'
import { SpotifyCallback } from './spotify'

import rootReducer from './rootReducer'

const sagaMiddleware = createSagaMiddleware()

export const history = createHistory()

const middleware = [
  sagaMiddleware, 
  routerMiddleware(history)
]

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

sagaMiddleware.run(rootSaga)

console.log(process.env)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path={process.env.LOGIN_CALLBACK} component={AuthCallback} />
          <Route exact path={process.env.SPOTIFY_CALLBACK} component={SpotifyCallback} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root')
)