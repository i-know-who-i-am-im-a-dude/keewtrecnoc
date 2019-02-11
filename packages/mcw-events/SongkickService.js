import * from 'node-fetch' as fetch
import { QueryUrl } from 'mcw-utils'


export default class SongkickService {
  /*
  */
  constructor() {
    this.key = process.env.SONGKICK_API_KEY
    this.host = 'https://api.songkick.com/api/3.0'
  }


  async searchMetro(name) {
    const path = '/search/locations.json'
    const resp = await fetch(new QueryUrl(`${this.host}${path}`, {
      query: name,
      apikey: this.key
    }))
    if (resp.ok) {
      const data = await resp.json()
      return {
        id: data.resultsPage.results[0].metroArea.id,
        city: data.resultsPage.results[0].metroArea.displayName,
        state: data.resultsPage.results[0].metroArea.state,
        country: data.resultsPage.results[0].metroArea.country 
      }
    }
  }


  async getMetro(lat, lng) {
    const path = '/search/locations.json'
    const resp = await fetch(new QueryUrl(`${this.host}${path}`, {
      location: `geo:${lat},${lng}`,
      apikey: this.key
    }))
    if (resp.ok) {
      const data = await resp.json()
      return {
        id: data.resultsPage.results[0].metroArea.id,
        metro: data.resultsPage.results[0].metroArea.displayName,
        state: data.resultsPage.results[0].metroArea.state,
        country: data.resultsPage.results[0].metroArea.country 
      }
    }
  }


  async getMetroConcerts(metroID, registrationTime, interval) {
    const path = `/metro_areas/${metroID}/calendar.json`
    const endpoint = new QueryUrl(`${this.host}${path}`, {
      apikey: this.apikey,

    })
    const resp = await fetch()
    if (resp.ok) {
      const data = await resp.json()
    }
  }

}