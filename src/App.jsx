
import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import { stringify } from 'querystring';


const Navbar = () => {
  return (
    <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
  )
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [] // stores messages coming from the server
    }
    this.addMessage = this.addMessage.bind(this);
    this.changeCurrentUser = this.changeCurrentUser.bind(this);
    
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
  
    // Connecting to WebSocket Server
    const socket = new WebSocket('ws://localhost:3001');
    this.socket = socket;
    socket.onopen = () => {
      console.log('Now connected to WebSocket server. Let the chattyness begin.');
    }
     //listening to socket
    socket.onmessage = (message) => {
      const parsedMsg = JSON.parse(message.data);
      console.log(`New ${parsedMsg.type} received.`);
      this.setState({messages:[...this.state.messages, parsedMsg]});
      // When the server sends a message, the state of the app updates with the new message
    }
  }

  

  addMessage (content, username) {
    this.socket.send(JSON.stringify({
      type: 'incomingMessage', 
      username, 
      content}));
  }

  changeCurrentUser (name) {
    const oldName = this.state.currentUser.name;
    this.setState({currentUser: {name}});
    this.socket.send(JSON.stringify({
      type: 'incomingNotification',
      content: `${oldName} changed their name to ${name}`}));
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUsername={this.state.currentUser.name} addMessage={this.addMessage} changeCurrentUser={this.changeCurrentUser}/>
      </div> 
    )
  }
}
export default App;

