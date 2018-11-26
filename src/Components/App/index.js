import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


// API SERVICES
import DataService from '../services/DataService';

// COMPONENTS
import Header from '../Header';
import MyJams from '../MyJams';


// CSS
import './index.css';

// FIREBASE
import * as firebase from 'firebase';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyC1mrq3vi-l49QxShQKF3DyO1fDzv4eFlY",
  authDomain: "jammint2-6a409.firebaseapp.com",
  databaseURL: "https://jammint2-6a409.firebaseio.com",
  projectId: "jammint2-6a409",
  storageBucket: "jammint2-6a409.appspot.com",
  messagingSenderId: "441787301493"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: null
    }

  }


  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        this.setState({user : user});
      
      } else {
        this.setState({
          user : null
        });
      }
    });
    
  }

  render() {
    const { user } = this.state;
    return (
      <div>

        <Router>

          <div className="app">
          
            <div className="app-header">
              <Header user={user} />}
            </div>
        
            <div className="app-body">

              <Switch>
                {/* <Route path="/landing" render = {(props) => {return <Login propsFn={props.history}/>}}/> */}
                {/* <Route path="/login" render = {(props) => {return <Login propsFn={props.history}/>}}/>
                <Route path="/register" render = {(props) => {return <Register propsFn={props.history}/>}}/> */}

                <Route path="/home" render = {(props) => { return <MyJams userID={props.match.params.user}/>}}/>
               
                
              </Switch>


            </div>

          </div>

        </Router>
        
      </div>
    );
  }
}

export default App;
