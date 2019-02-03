import React, { Component } from 'react'
import { Dropdown, Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LOGOUT_REQUESTED } from './../../session/actions'
import { apiRoutes, requestData } from './../../utils'

class NavMenu extends Component {

  logout = () => {
    this.props.logout()
  }

  handleNavClick() {
    this.props.history.push('/events')
  }

  render() {

    return (
      <div>
        <Menu pointing secondary>
          <Link to='/'>
            <Menu.Item position='left'>Promoter Data</Menu.Item>
          </Link>
          <Link to='/dash'>
            <Menu.Item 
              position='left' 
              name='dashboard'  
              />
          </Link>
          <Link to='/events'>
            <Menu.Item 
              position='left' 
              name='events' 
              />
          </Link>
          <Menu.Item position='right' >
            <Dropdown text='Account'>
              <Dropdown.Menu>
                <Link to='/account'>
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Link to='/logout'>
                  <Dropdown.Item>Logout</Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          </Menu>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    logout: redirect => dispatch({ type: LOGOUT_REQUESTED, redirect })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavMenu)