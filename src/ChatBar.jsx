import React, {Component} from 'react';


class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {messageContent:'', username: this.props.currentUsername}
  }
  changeMessageValue(messageContent){
    this.setState({messageContent});
  }
  changeUserValue(username) {
    this.setState({username});
  }
  render() {
    const keyPressMessageHandler = (event) => {
      if(event.key === 'Enter'){
        const messageContent = this.state.messageContent;
        const username = this.props.currentUsername;
        const userColor = this.props.userColor;
        this.props.addMessage(messageContent, username, userColor);
        this.changeMessageValue('');
      }
    }
    const keyPressUserHandler = (event) => {
      if(event.key === 'Enter'){
        const username = this.state.username;
        this.props.changeCurrentUser(username);
      }
    }
    const onChangeMessageHandler = (event) => {
      this.changeMessageValue(event.target.value);
    }
    const onChangeUserHandler = (event) => {
      this.changeUserValue(event.target.value);
    }
    return (
      <footer className="chatbar">
        <input 
          className="chatbar-username" 
          value={this.state.username}
          name="username"
          onChange= {onChangeUserHandler}
          onKeyPress={keyPressUserHandler}
        />
        <input 
          className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          name="content"
          value = {this.state.messageContent}
          onChange = {onChangeMessageHandler}
          onKeyPress = {keyPressMessageHandler}
        />
        <p>{this.props.currentUsername}</p>

      </footer>
    );
  }
}

export default ChatBar;
