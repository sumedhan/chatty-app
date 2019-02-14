import React, {Component} from 'react';

class IncomingMessage extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
      </div>
    );
    }
}
class IncomingNotification extends Component {
  render() {
    return (
      <div className="message system">
        {this.props.content}
      </div>
    )
  }
}
class Message extends Component {
  render() {
    let message = this.props.messageDetails;
    console.log(message);
    return (
      (message.type === 'incomingMessage') ?
      (<IncomingMessage 
      content={message.content}
      username={message.username}
      />) :
      (<IncomingNotification
      content={message.content}
      />)
    )
  }
}

export default Message;
