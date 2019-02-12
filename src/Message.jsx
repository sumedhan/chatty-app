import React, {Component} from 'react';

const IncomingMessage = () => {
  return (
    <div className="message">
      <span className="message-username">Anonymous1</span>
        <span className="message-content">I won't be impressed with technology until I can download food.</span>
    </div>
  );
}
const IncomingNotification = () => {
  return (
    <div className="message system">
      Anonymous1 changed their name to nomnom.
    </div>
  )
}
class Message extends Component {
  render() {
    let messageOrNotification = <IncomingMessage />
    if(this.props.type === 'incomingNotification') {
      messageOrNotification = <IncomingNotification />
    }
    return (
      <div>
      {messageOrNotification}
      </div>
    );
  }
}

export default Message;
