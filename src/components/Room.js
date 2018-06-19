import React, {Component} from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';


class Room extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <div className="App">
        <nav className="room-navigation">
          <header className="App-header">
            <h1>Bloc Chat</h1>
          </header>
          <RoomList firebase={firebase} />
        </nav>
        <section className="message-list">
          <MessageList firebase={firebase} />
        </section>
      </div>
    )
  }
}
