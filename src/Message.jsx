import React, {Component} from 'react';

class IncomingMessage extends Component {
  render() {
    const style = {
      color: this.props.userColor
    }
    //  handles links to images
    const messageContentHandler = (content) => {
      const searchExpForImgLinks = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
      const linkInContent= content.match(searchExpForImgLinks);
      if(linkInContent) {
        let link = linkInContent[0];
        let linkLength = linkInContent[0].length;
        let linkIndex = linkInContent.index;
        return (
          <div className="message-content">
            <span>{content.slice(0,linkIndex)}</span>
            <img src={link} alt={link}/>
            <span>{content.slice(linkIndex+linkLength)}</span>
          </div>)
      }
      return (<span className="message-content">{this.props.content}</span>)
    }
    return (
      <div className="message">
        <span className="message-username" style={style}>{this.props.username}</span>
        {messageContentHandler(this.props.content)}
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
