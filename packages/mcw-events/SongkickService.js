const fetch = require('node-fetch')
import { QueryUrl } from 'mcw-utils'


export default class SongkickService {
  /*
  */
  constructor() {
    this.key = process.env.SONGKICK_API_KEY
    this.host = 'https://api.songkick.com/api/3.0'
  }


  async searchMetro() {
    const path = '/search/locations.json'
    const resp = await fetch(QueryUrl(`${this.host}${path}`, {
      query: name,
      apikey: this.key
    }))
    if (resp.ok) {
      const data = await resp.json()
      const firstMetro = data.resultsPage.results.location[0].metroArea
      return {
        id: firstMetro.id,
        name: firstMetro.displayName,
        state: firstMetro.state.displayName,
        country: firstMetro.country.displayName
      }
    }
  }


  async getMetro(lat, lng) {
    console.log(this)
    const url = `${this.host}/search/locations.json`
    const resp = await fetch(QueryUrl(url, {
      location: `geo:${lat},${lng}`,
      apikey: this.key
    }))
    if (resp.ok) {
      const data = await resp.json()
      const firstMetro = data.resultsPage.results.location[0].metroArea
      return {
        id: firstMetro.id,
        name: firstMetro.displayName,
        state: firstMetro.state.displayName,
        country: firstMetro.country.displayName 
      }
    }
  }


  async getMetroConcerts (metroID, registrationTime, interval) {
    const path = `/metro_areas/${metroID}/calendar.json`
    const endpoint = QueryUrl(`${this.host}${path}`, {
      apikey: this.apikey,

    })
    const resp = await fetch()
    if (resp.ok) {
      const data = await resp.json()
    }
  }

}