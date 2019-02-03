import { apiRoutes } from './../utils'


const _buildUrl = (resource, params) => {
  const url = new URL(resource)
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  return url
}


export default class SpotifyService {

  constructor() {
    this.credentials = {
      clientID: process.env.SPOTIFY_CLIENT_ID, 
      secret: process.env.SPOTIFY_SECRET
    }
  }

  get scopes() {
    return [
      'playlist-read-private',
      'playlist-modify-private',
      'playlist-modify-public',
      'user-top-read',
      'user-read-private'
    ].join(' ')
  }

  get authorizationUrl() {
    return _buildUrl(apiRoutes.spotify.authorize, {
      client_id: this.credentials.clientID,
      response_type: 'code',
      redirect_uri: apiRoutes.spotify.redirect,
      scope: this.scopes
    })
  }

}