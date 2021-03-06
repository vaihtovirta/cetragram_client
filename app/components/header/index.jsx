import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import NavigationLeft from 'components/navigation/left';
import NavigationRight from 'components/navigation/right';

export default class Header extends Component {
  render() {
    const links = [
      { title: 'Upload Image', route: '/' },
      { title: 'All Images', route: '/images' }
    ];

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            cetragram
          </Navbar.Brand>
        </Navbar.Header>
        <NavigationLeft items={ links }/>
        <NavigationRight/>
      </Navbar>
    );
  }
}
