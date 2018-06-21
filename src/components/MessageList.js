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

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.props.user,
      content: this.state.messages,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    })
    this.setState=({
      username: "",
      content: "",
      sentAt: "",
      roomId: ""
    });
  }

  handleChange(e){
    e.preventDefault();
    this.setState({content: e.target.value});
  }

  render() {
    return (
      <div>
        <div className="messages">
          {this.state.messages.filter(message => message.roomId === this.props.activeRoom).map((message,index)=>
          <div className={index}>{message.content}</div>)}
        </div>
        <div className="newMessage">
          <form className="message-form" onSubmit={(e)=>this.createMessage(e)}>
            <div>
              <input type="text" placeHolder="Write Your Message Here" onChange={(e)=>this.handleChange(e)} />
            </div>
            <div className="submit-button">
              <input type="submit" value="Submit"/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default MessageList;
