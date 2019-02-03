import auth0 from 'auth0-js'
import { apiRoutes } from './../utils'

const Auth0Options = {
  clientID: process.env.AUTH0_CLIENT_ID,
  domain: apiRoutes.auth0.domain,
  audience: apiRoutes.auth0.audience,
  responseType: 'token id_token'
}


export class AuthService {
  /*
    Primary interface object to 
    authenticate and authorize users
  */

  constructor() {
    const socialScopes = 'openid profile email'
    const mgmtScopes = [
      'read:current_user',
      'create:current_user_metadata',
      'read:current_user_metadata', 
      'update:current_user_metadata', 
      'delete:current_user_metadata'
    ].join(' ')
    this.options = Object.assign({}, Auth0Options, {
      scope: `${socialScopes} ${mgmtScopes}`
    })
    this.auth0 = new auth0.WebAuth(this.options)
  }


  login = () => {
    const authParams = { redirectUri: apiRoutes.auth0.redirect }
    return new Promise((resolve, reject) => {
      this.auth0.popup.authorize(authParams, (err, result) => {
        if (result) {
          resolve(result)
        } else if (err) {
          if (err.name === 'SyntaxError') {
            // Prevent throw of known Auth0 bug
            // https://github.com/auth0/auth0.js/issues/512
            console.error('known Auth0 bug (recoverable)', err)
          } else {
            this.attemptCallback()
            reject(err)
          }
        }
      })
    })
  }

  loginCallback = () => {
    this.auth0.popup.callback()
  }

  logout = () => {
    this.auth0.logout({ 
      returnTo: apiRoutes.auth0.logoutReturnTo,
      clientID: Auth0Options.clientID
    })
  }
}

export class UserService {
  /*
    Secondary interface object providing 
    CRUD functionality to user data 
  */

  constructor(userID, accessToken) {
    this.id = userID
    this.auth0 = new auth0.Management({
      domain: Auth0Options.domain,
      token: accessToken
    })
  }

  setData = data => {
    this.data = Object.assign({}, data)
  }

  getMetadata = () => {
    return new Promise((resolve, reject) => {
      this.auth0.getUser(this.id, (err, data) => {
        if (data) {
          resolve(data)
        } else if (err) {
          reject(err)
        }
      })
    })
  }

  updateMetadata = data => {
    return new Promise((resolve, reject) => {
      this.auth0.patchUserMetadata(this.id, data, (err, resp) => {
        if (resp) {
          resolve(resp)
        } else if (err) {
          reject(err)
        }
      })
    })
  }

}
