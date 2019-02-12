import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        <Message 
          type="incomingMessage" 
          content="I won't be impressed with technology until I can download food."
          username="Anonymous1"
        />
        <Message
          type="incomingNotification"
          content="Anonymous1 changed their name to nomnom."
        />

      </main>
    );
  }
}

export default MessageList;
