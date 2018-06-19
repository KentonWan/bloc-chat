import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <nav className="room-navigation">
          <header className="App-header">
            <h1>Bloc Chat</h1>
          </header>
          <RoomList firebase={firebase} />
        </nav>
      </div>
    );
  }
}

export default App;
