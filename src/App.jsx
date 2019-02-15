
import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';
import { stringify } from 'querystring';





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [], // stores messages coming from the server
    }
    this.addMessage = this.addMessage.bind(this);
    this.changeCurrentUser = this.changeCurrentUser.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    console.log(`current user is ${this.state.currentUser.name}`);
    this.inputRef.current.focus();

    // Connecting to WebSocket Server
    const socket = new WebSocket('ws://localhost:3001');
    this.socket = socket;
    socket.onopen = () => {
      console.log('Now connected to WebSocket server. Let the chattyness begin.');
    }
     //listening to socket
    socket.onmessage = (message) => {
      const parsedMsg = JSON.parse(message.data);
      console.log(`New message with type: ${parsedMsg.type} received.`);

      // When the server sends a message - the following switch handles it on client side and makes 
      switch (parsedMsg.type) {
        case 'incomingNotification':
        case 'incomingMessage': 
          this.setState({messages:[...this.state.messages, parsedMsg]});
          break;
        case 'onlineUsers':
          this.setState({onlineUsers: parsedMsg.content});
          break;
        case 'userColor':
          let currentUser = this.state.currentUser;
          currentUser.color = parsedMsg.content;
          this.setState({currentUser});
          break;
        default:
          console.log("Error. The message type cannot be handled");
          break;
      }
    }
  }

  // Method called when a user sends a message, sends it to the server
  addMessage (content, username, userColor) {
    this.socket.send(JSON.stringify({
      type: 'incomingMessage', 
      username, 
      content,
      userColor
    }));
  }

  //  Method to change current user's name in state and send a notification to the server to send a notification to all users
  changeCurrentUser (name) {
    const oldName = this.state.currentUser.name;
    let currentUser = this.state.currentUser;
    currentUser.name = name;
    this.setState({currentUser});
    this.socket.send(JSON.stringify({
      type: 'incomingNotification',
      content: `${oldName} changed their name to ${name}`}));
  }

  render() {
    //App component displaying three different components
    return (
      <div>
        <Navbar onlineUsers={this.state.onlineUsers}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUsername={this.state.currentUser.name} 
          addMessage={this.addMessage} 
          changeCurrentUser={this.changeCurrentUser} 
          userColor={this.state.currentUser.color}
        />
      </div> 
    )
  }
}
export default App;

