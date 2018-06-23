import React, { Component} from 'react';
import './User.css';


class User extends Component {
  constructor(props){
    super(props);

}

signIn() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );
}

signOut() {
  this.props.firebase.auth().signOut();
}

componentDidMount() {
  this.props.firebase.auth().onAuthStateChanged( user => {
  this.props.setUser(user);
  console.log(user.displayName);
});
}



  render() {
    return (
      <div className="user-login">
        <div>Logged in as: {this.props.user === null ? "Guest" : this.props.user.displayName}</div>
        <div className="signInOutButtons">
          <button className="signInButton" onClick={() => {this.signIn()}}>Sign In</button>
          <button className="signOutButton" onClick={() => {this.signOut()}}>Sign Out</button>
        </div>
      </div>
    )
  }
}
export default User;
