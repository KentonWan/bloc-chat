import React, { Component} from 'react';


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



  render() {
    return (
      <div>
        <div className="signIn">
          <button className="signInButton" onClick={() => {this.signIn()}}>Sign In</button>
        </div>
        <div className="signOut">
          <button className="signOutButton" onClick={() => {this.signOut()}}>Sign Out</button>
        </div>
      </div>
    )
  }
}
export default User;
