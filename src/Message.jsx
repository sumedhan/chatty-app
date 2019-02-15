import React, {Component} from 'react';

class IncomingMessage extends Component {
  render() {
    const style = {
      color: this.props.userColor
    }
    
    return (
      <div className="message">
        <span className="message-username" style={style}>{this.props.username}</span>
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
    return (
      //  conditional loop to display either a notification or a message
      (message.type === 'incomingMessage') ?
      (<IncomingMessage 
      content={message.content}
      username={message.username}
      userColor={message.userColor}
      />) :
      (<IncomingNotification
      content={message.content}
      />)
    )
  }
}

export default Message;
