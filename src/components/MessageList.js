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
  }

  componentDidMount () {
    console.log (this.props.activeRoom);
    this.messagesRef.orderByChild("roomId").equalTo(this.props.activeRoom).on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(message )});
    });
  }

  render() {
    return (
      <div className="messages">
        {this.state.messages.map( (message, index) =>
          <div key={index}>{message.content}</div>
        )}
      <div>{this.props.activeRoom}</div>
      </div>
    )
  }
}

export default MessageList;
