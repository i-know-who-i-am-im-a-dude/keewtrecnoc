const _protocol = 'https'
const _host = 'localhost:3000'

const auth0Routes = {
  redirect: `${_protocol}://${_host}/auth0-callback`,
  audience: 'https://kenny-test.auth0.com/api/v2/',
  domain: 'kenny-test.auth0.com',
  logoutReturnTo: `${_protocol}://${_host}`
}

const spotifyRoutes = {
  authorize: 'https://accounts.spotify.com/authorize',
  redirect: `${_protocol}://${_host}/spotify-callback`
}

export const apiRoutes = {
  auth0: auth0Routes,
  spotify: spotifyRoutes
}