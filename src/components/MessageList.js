import React, { Component} from 'react';
import "./MessageList.css";

var moment = require('moment'); 
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: "",
      content: "",
      sentAt: "",
      roomId: ""
    };
    this.messagesRef = this.props.firebase.database().ref('messages');

    }

  componentDidMount () {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(message )});
    });

  }

  handleChange(e){
    e.preventDefault();
    this.setState({
      username: !this.props.user ? "Guest" : this.props.user.displayName,
      content: e.target.value,
      sentAt: moment().format('LT'),
      roomId: this.props.activeRoom
    });
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    })
    this.setState({
      username: '',
      content: '',
      sentAt:'',
      roomId:''
    })
  }

  render() {
    return (
      <div>
        <div className="chatroom-name">
          <h2>{(this.props.activeRoom === '') ? "Please Choose Chat Room" : this.props.activeRoom}</h2>
        </div>
        <div className="messages">
          {this.state.messages.filter(message => message.roomId === this.props.activeRoomId).map((message,index)=>
          <div className="message-block">
            <div className="message-username">{message.username}</div>
            <div className="message-content">{message.content}</div>
            <div className="message-sentAt">{message.sentAt}</div>
          </div>)}
        </div>
        <div className="newMessage">
          <form className="message-form" onSubmit={(e)=>this.createMessage(e)}>
            <div>
              <input className="messageBox" type="text" size="100" value={this.state.content} placeHolder="Type message here" onChange={(e)=>this.handleChange(e)} /><input className="sendButton" type="submit" value="Send"/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default MessageList;
