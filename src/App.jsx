import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


function randomId() {
  return Math.random().toString(36).substr(2,6);
}


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
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
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
    socket.onopen = () => {
      console.log("Now connected to WebSocket server. Let the chattiness begin.");
      socket.send("I feel chatty");
    }


  }

  addMessage (content, username) {
    const newMessage = {
      id: randomId(),
      username,
      content
    }
    const messages = [...this.state.messages, newMessage];
    this.setState({messages});
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

