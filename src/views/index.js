import React from 'react'
import { Container, Divider } from 'semantic-ui-react'
import { pullRight, h1 } from './layout.css'
import NavMenu from './NavMenu'


const Layout = ({ hideNav, children }) => {
  return (
    <Container>
      { hideNav ? null : <NavMenu /> }
      { children }
      <Divider />
    </Container>
  )
}

export default Layout