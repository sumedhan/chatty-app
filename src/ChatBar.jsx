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
      //  handler for enter keypress in message, it calls the add message function
      if(event.key === 'Enter'){
        const messageContent = this.state.messageContent;
        const username = this.props.currentUsername;
        const userColor = this.props.userColor;
        this.props.addMessage(messageContent, username, userColor);
        this.changeMessageValue('');
      }
    }
    //  Handle for enter keypress in username field and changes current username
    const keyPressUserHandler = (event) => {
      if(event.key === 'Enter'){
        const username = this.state.username;
        this.props.changeCurrentUser(username);
      }
    }
    //  handles any change in chatbar message
    const onChangeMessageHandler = (event) => {
      this.changeMessageValue(event.target.value);
    }
    //  handles change in username
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
      </footer>
    );
  }
}

export default ChatBar;
