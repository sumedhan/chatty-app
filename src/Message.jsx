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
// const IncomingNotification = () => {
//   return (
//     <div className="message system">
//       Anonymous1 changed their name to nomnom.
//     </div>
//   )
// }
class Message extends Component {
  render() {
    return (
      <IncomingMessage 
      content={this.props.content}
      username={this.props.username}
      />
    )
  }
}

export default Message;
