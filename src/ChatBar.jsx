import React, {Component} from 'react';


class ChatBar extends Component {
  render() {
    const handleKeyPress = (event) => {
      if(event.key === 'Enter' && event.target.name === "content"){
        const messageContent = event.currentTarget.elements.content.value;
        const username = event.currentTarget.elements.username.value;
        this.props.addMessage(messageContent, username);
        event.target.value='';
      }
    }
    return (
      <footer>
      <form className="chatbar" onKeyPress={handleKeyPress}>
        <input className="chatbar-username" placeholder={this.props.currentUser.name} name="username"/>
        <input 
          className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          name="content"
          />
      </form>
      </footer>
    );
  }
}

export default ChatBar;
