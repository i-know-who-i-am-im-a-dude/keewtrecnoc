import auth0 from 'auth0-js'


const Auth0Options = {
  clientID: process.env.AUTH0_CLIENT_ID,
  domain: process.env.AUTH0_DOMAIN,
  audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
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


  login = redirect => {
    const authParams = { redirectUri: redirect }
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
            this.loginCallback()
            reject(err)
          }
        }
      })
    })
  }

  loginCallback = () => {
    this.auth0.popup.callback()
  }

  logout = returnTo => {
    this.auth0.logout({ 
      returnTo: returnTo,
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

  getMetadata = () => {
    /*
      Obtains the current User object from Auth0, including 
      all app-defined user metadata. Returns the entire user object
    */
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
    /*
      Update the Auth0 'user_metadata' property on the current user.
      Returns the newly updated user object.
    */
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