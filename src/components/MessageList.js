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
      roomId: this.props.activeRoomId
    });
  }

  createMessage(e) {
    e.preventDefault();
    if (this.props.activeRoomId === '') {
      window.alert("Please Choose a Chat Room First =)")
    }
    else {
      this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
      })
    }
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
          <h2>{(this.props.activeRoom === '') ? "" : this.props.activeRoom}</h2>
        </div>
        <div className="messages">
          {this.state.messages.filter(message => message.roomId === this.props.activeRoomId).map((message,index)=>
          <div key={index} className="message-block">
            <div className="message-username">{message.username}</div>
            <div className="message-content">{message.content}<span className="message-sentAt">{message.sentAt}</span></div>
          </div>)}
        </div>
        <div className="newMessage">
          <form className="message-form" onSubmit={(e)=>this.createMessage(e)}>
            <div>
              <input className="messageBox" type="text" size="90" value={this.state.content} placeholder="Type message here" onChange={(e)=>this.handleChange(e)} /><input className="sendButton" type="submit" value="Send"/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default MessageList;
