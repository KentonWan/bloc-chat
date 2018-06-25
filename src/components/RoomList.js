import React, {Component} from 'react';
import './RoomList.css';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      value: '',
      currentRoom: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  componentDidMount () {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat(room )});
    });
  this.roomsRef.on('child_changed', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      let oldRoomList = this.state.rooms;
      let index = oldRoomList.findIndex(rooms => rooms.key === room.key)
      oldRoomList[index]=room;
      this.setState({rooms: oldRoomList})
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
    this.roomsRef.push({
      name: newRoomName
    })
    this.setState({value: ''});

  }

  renameRoom(e) {
    e.preventDefault();
    let updatedName = {key: this.props.activeRoomId,
                   name: window.prompt("Please enter a new room name")};
    console.log(this.props.activeRoomId)
    console.log(updatedName);
    this.roomsRef.child(this.props.activeRoomId).update({name: updatedName.name});
    this.props.updateRoom(updatedName);
    console.log(this.props.activeRoom)


  }

  /*componentWillReceiveProps(nextProps) {
    if (this.props.activeRoom !== nextProps.activeRoom) {
      console.log(nextProps.activeRoom);
      console.log(this.props.activeRoom);
  }
}*/

  deleteRoom(e) {
    e.preventDefault();
    const updatedRooms = this.state.rooms.filter(room => room.key !== this.props.activeRoomId)
    this.props.updateRoom('');
    this.setState({rooms: updatedRooms})
    this.roomsRef.child(this.props.activeRoomId).remove()
  }



  render() {
    return (
      <div className="room-list">
        <ul className="chat-room-list">
          <li className="chat-title">Chat Rooms:</li>
        {
          this.state.rooms.map((room,index) =>
               <li key={index} className="room-number" value={room.key} onClick={()=>this.props.updateRoom(room)}>{room.name}</li>
          )
        }
        </ul>
        <form className="chat-form" onSubmit={(e)=>this.createRoom(e)}>
          <div>
            <label>
              <div>Add Chat Room:</div>
              <div>
                <input type="text" value={this.state.value} placeholder="Chat Room Name" onChange={(e)=>this.handleChange(e)} />
                <input className="submit-button" type="submit" value="Add"/>
              </div>
            </label>
          </div>
        </form>
        <div className="rename-room">
            <button className="renameRoomButton" onClick={(e)=>this.renameRoom(e)}>Rename Current Room</button>
        </div>
        <div className="delete-room">
            <button className="deleteRoomButton" onClick={(e)=>this.deleteRoom(e)}>Delete Current Room</button>
        </div>
      </div>
    );
  }
}
export default RoomList;
