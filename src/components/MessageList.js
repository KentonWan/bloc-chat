import React, { Component} from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{
        username: "",
        content: "",
        sentAt: "",
        roomID: ""
      }],

    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount () {
    this.roomsRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(message )});
    });
  }

  render() {
    return (
      <div>
        <h1>Message List</h1>
      </div>
    )
  }
}

export default MessageList;
