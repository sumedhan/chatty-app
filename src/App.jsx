import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const Navbar = () => {
  return (
    <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
  )
}


class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <MessageList />
        <ChatBar />

      </div>
      
    )
  }
}
export default App;
