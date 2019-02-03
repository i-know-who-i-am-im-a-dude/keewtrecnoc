
const _buildUrl = (resource, params) => {
  const url = new URL(resource)
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  return url
}


export default class SpotifyService {

  constructor() {
    this.api = {
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
    return _buildUrl('https://accounts.spotify.com/authorize', {
      client_id: this.api.clientID,
      response_type: 'code',
      redirect_uri: 'https://localhost:3000/spotify-callback',
      scope: this.scopes
    })
  }

  /*
    http://localhost:3000/spotify-callback?code=AQCcK4hfEqcVTEs3OcUAQRJf4fmEKRdnrtlVBpdLc0JawvMP9Sl9Y4fcqZMnqgxFV9Or__pVJ4bBLDD5cghHpyKJUtdU-XqyczfeM7UZSRfRZ9aNStJdMW09ZVZYazN8BPBeeRyuIc8YAKO9IXIeS0yVki04mmG-WCB6YnK0O3GBIVSM5ctaooS3-GppbRgpf5s6cj_uC7f9xgKgXt89DiHFvvV5v1l0xcbveg3Y-l0EZVsMfZxmYN3KygIkzXnk7hD1tTG4xvBRfdOLQ_BA-uk6Z3YiOcS5omf57fNBpAF5M_oR4PLwSWihQFiYIpY70KWU6qMeBl4w-U8VKwbH71ZCkVIkFGAX
  */

  

}