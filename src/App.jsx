
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
    // setTimeout(() => {
    //   console.log('Simulating incoming message');
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);

    // Connecting to WebSocket Server
    const socket = new WebSocket('ws://localhost:3001');
    this.socket = socket;
    socket.onopen = () => {
      console.log('Now connected to WebSocket server. Let the chattyness begin.');
    }

    //listening to socket
    socket.onmessage = (message) => {
      // When the server sends a message, the state of the app updates with the new message
      this.setState({messages:[...this.state.messages, JSON.parse(message.data)]})
      console.log("New message received.");
    }
  }

  addMessage (content, username) {
    this.socket.send(JSON.stringify({username, content}));
  }


  changeCurrentUser (name) {
    const currentUser = {
      name
    }
    this.setState({currentUser});

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

