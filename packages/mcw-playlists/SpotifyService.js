import { QueryUrl } from 'mcw-utils'


export default class SpotifyService {

  constructor() {
    this.clientID = process.env.SPOTIFY_CLIENT_ID 
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

  get oauthUrl() {
    const { APP_HOST, APP_PORT, APP_PROTOCOL, SPOTIFY_CALLBACK } = process.env
    const host = APP_HOST === 'localhost' ? `${APP_HOST}:${APP_PORT}` : APP_HOST
    return QueryUrl('https://accounts.spotify.com/authorize', {
      client_id: this.clientID,
      response_type: 'code',
      redirect_uri: `${APP_PROTOCOL}://${host}${SPOTIFY_CALLBACK}`,
      scope: this.scopes
    })
  }

}