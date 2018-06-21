import React, { Component} from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{
        username: "",
        content: "",
        sentAt: "",
        roomId: ""
      }],

    };
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.messagesRef.push({
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP});
    }

  componentDidMount () {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(message )});
    });


  }

  render() {
    return (
      <div className="messages">
        {this.state.messages.filter(message => message.roomId === this.props.activeRoom).map((message,index)=>
        <div className={index}>{message.content}</div>)}
      </div>
    )
  }
}

export default MessageList;
