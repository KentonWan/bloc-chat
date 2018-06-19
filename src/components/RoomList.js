import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      value: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount () {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat(room )});
    });
  }

  handleChange(e) {
    e.preventDefault();
    let newChatRoom = e.target.value
    this.setState({value: newChatRoom});
  }

  createRoom(e) {
    e.preventDefault();
    let newRoomName = this.state.value;
    console.log(newRoomName);
    this.roomsRef.push({
      name: newRoomName
    })
    this.setState({value: ''});

  }

  render() {
    return (
      <div>
        <ul>
        {
          this.state.rooms.map((room,index) =>
            <li key={index} className="room-number">{room.name}</li>
          )
        }
        </ul>
        <form onSubmit={(e)=>this.createRoom(e)}>
          <label>
            Chat Room Name:  <input type="text" value={this.state.value} onChange={(e)=>this.handleChange(e)} />
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}
export default RoomList;
