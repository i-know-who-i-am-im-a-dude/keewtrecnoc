import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Image, Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthButton } from './../../identity'


class NavMenu extends Component {

  userImage = () => {
    const { user } = this.props
    if (user) {
      return <Image src={user.picture} avatar />
    } else {
      return <Icon size='big' name='user circle' />
    }
  }

  render() {
    const { user } = this.props
    return (
      <div>
        <Menu pointing secondary>
          <Link to='/'>
            <Menu.Item position='left'>My Concert Week</Menu.Item>
          </Link>
          <Menu.Item position='right' >
            { this.userImage() }
            <AuthButton />
          {
            // <Dropdown text='Account'>
            //   <Dropdown.Menu>
            //     <Link to='/account'>
            //       <Dropdown.Item>Profile</Dropdown.Item>
            //     </Link>
            //     <Dropdown.Divider />
            //     <Link to='/logout'>
            //       <Dropdown.Item>Logout</Dropdown.Item>
            //     </Link>
            //   </Dropdown.Menu>
            // </Dropdown>
          }
          </Menu.Item>
          </Menu>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.identity.user
  }
}

export default connect(mapStateToProps)(NavMenu)