import React, {Component} from 'react';


class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {messageContent:'', username: this.props.currentUser.name}
  }
  changeMessageValue(messageContent){
    this.setState({messageContent});
  }
  changeUserValue(username) {
    this.setState({username});
  }
  render() {
    const keyPressHandler = (event) => {
      if(event.key === 'Enter'){
        const messageContent = this.state.messageContent;
        const username = this.state.username;
        this.props.addMessage(messageContent, username);
        this.changeMessageValue('');
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
        />
        <input 
          className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          name="content"
          value = {this.state.messageContent}
          onChange = {onChangeMessageHandler}
          onKeyPress = {keyPressHandler}
          />
      </footer>
    );
  }
}

export default ChatBar;
