import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
                  activeRoom: '',
                  user: ''
    }
  }

  updateRoom(roomId){
    this.setState({activeRoom: roomId});
  }

  setUser(currentUser){
    this.setState({user: currentUser});
    console.log(currentUser);
  }

  render() {
    return (
      <div className="App">
        <nav className="room-navigation">
          <header className="App-header">
            <h1>Bloc Chat</h1>
          </header>
          <div className="logIn">
            <User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user}/>
          </div>
          <RoomList firebase={firebase} updateRoom={this.updateRoom.bind(this)}/>
        </nav>
        <section className="message list">
          <MessageList firebase={firebase}
                       activeRoom = {this.state.activeRoom}/>
        </section>
      </div>
    );
  }
}

export default App;
