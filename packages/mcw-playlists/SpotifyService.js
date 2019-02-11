import { QueryUrl } from 'mcw-utils'


export default class SpotifyService {

  constructor() {
    this.clientID = process.env.SPOTIFY_CLIENT_ID 
    this.secret = process.env.SPOTIFY_SECRET
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

  oauthUrl(redirect) {
    return QueryUrl('https://accounts.spotify.com/authorize', {
      client_id: this.clientID,
      response_type: 'code',
      redirect_uri: redirect,
      scope: this.scopes
    })
  }

}