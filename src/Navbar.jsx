import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h3 className="navbar-info">{this.props.onlineUsers} users online</h3>
        </nav>
    )
  }
}
export default NavBar;
