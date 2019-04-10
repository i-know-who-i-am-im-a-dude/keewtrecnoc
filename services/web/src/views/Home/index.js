import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SpotifyOAuthButton } from './../../spotify'
import { LocationButton } from './../../identity'
import Layout from './../'

import bg from './mcw1.jpg';

class Home extends Component {

  render() {
    const { user } = this.props
    return (
      <Layout>
        <img src={bg} className="background"/>
        <div className="content">
        <h1 className="title">Headliner</h1>
        <p>Does this have something to do with concerts? You bet your ass.  What? Not sure. We'll get there. When? Not important. If you have Spotify, log in. If not, log in. Man, it's windy.  OK this should be enough copy to style what I need.  I am putting a email form below here next.</p>
        </div>
        { user ? <SpotifyOAuthButton /> : null }
        { user ? <LocationButton /> : null }
      </Layout>
    )
  }
}


const mapStateToProps = state => {
  return {
    user: state.identity.user
  }
}

export default connect(mapStateToProps)(Home)