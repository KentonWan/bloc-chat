import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config = {
    apiKey: "AIzaSyAgtJqQDyrWpyTIeQcSSXTC5DuWMSpeJrc",
    authDomain: "bloc-chat-cd3f8.firebaseapp.com",
    databaseURL: "https://bloc-chat-cd3f8.firebaseio.com",
    projectId: "bloc-chat-cd3f8",
    storageBucket: "bloc-chat-cd3f8.appspot.com",
    messagingSenderId: "307760294352"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
                  activeRoom: ''
    }
  }

  handleClick(){
    this.setState({value: this.props.room.name})

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
        <section className="message list">
          <MessageList firebase={firebase} />
        </section>
      </div>
    );
  }
}

export default App;
