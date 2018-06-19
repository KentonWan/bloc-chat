import React, {Component} from 'react';
import './RoomList.css';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      value: 'Name'
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
    this.setState({value: e.target.value});
  }

  createRoom() {
    let newRoomName = this.state.value;
    console.log(newRoomName);
    this.roomsRef.push({
      name: newRoomName
    });

  }

  render() {
    return (
      <div className="room-list">
        <ul className="chat-room-list">
        {
          this.state.rooms.map((room,index) =>
            <li key={index} className="room-number">{room.name}</li>
          )
        }
        </ul>
        <form className="chat-form" onSubmit={()=>this.createRoom()}>
          <div>
            <label>
              <div>Add Chat Room:</div>
              <div><input type="text" value={this.state.value} onChange={(e)=>this.handleChange(e)} /></div>
            </label>
          </div>
          <div className="submit-button">
            <input type="submit" value="Submit"/>
          </div>
        </form>
      </div>
    );
  }
}
export default RoomList;
