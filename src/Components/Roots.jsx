import React from 'react';
import Navbar from './NavbarView';

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}