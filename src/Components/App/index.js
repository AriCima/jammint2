import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// COMPONENTS
import Login from '../ACCESS/Login';
import Register from '../ACCESS/Register';

// SERVICES
import DataService from '../services/DataService';


// * * *  HEADERS * * * 
import HeaderLanding from '../HEADERS/HeaderLanding';
import HeaderLogIn from '../HEADERS/HeaderLogIn';
import HeaderHome from '../HEADERS/HeaderHome';
import HeaderJam from '../HEADERS/HeaderJam';


// BODIES
import Home from '../Home';

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
      user    : null,
      nav     : '',
      userJams: [],
      jam     : [],
      chat    : [],
    }

    this.navJam   = this.navJam.bind(this);
    this.navChat  = this.navChat.bind(this);
  }


  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        DataService.getUserInfo(user.uid)
        .then(result =>{
         
          let userJams = result.userJams;
          
          this.setState({
            user : user,
            userJams: userJams
          })
          console.log('APP state ', this.state)
        })

      } else {
        this.setState({
          user : null
        });
      }
    });
  }

  navJam(jamID, jamName){
    let transJam = [jamID, jamName];
    this.setState ({
      nav   : 'jam',
      jam   : transJam,
      chat  : [], 
    })
    console.log('el state en el APP luego de navJam = ', this.state)
  }

  navChat(chatID, chatterName){
    let transChat = [chatID, chatterName];
    this.setState ({
      nav   : 'chat',
      jam   : [],
      chat  : transChat, 
    })
    console.log('actualización App, state = ', this.state);
  }

  render() {
    console.log('state del App en el render ', this.state)
    return (
      <div>

        <Router>

          <div className="app">

           {/* * * * * * * HEADERS * * * * * * */}
            <div className="app-header">  
              
              <Switch>

                <Route path="/"  exact render = {() => { return  <HeaderLanding/>}}/>
                <Route path="/login"  exact render = {() => { return  <HeaderLogIn />}}/>
                <Route path="/create-new-jam/:userId" exact render = {(props) => { return <HeaderHome userID={props.match.params.userId}/>}}/>

                {/* * * *  HOME * * * */}
                <Route path="/home/:userId/*" exact render = {(props) => { return <HeaderHome userJams={this.state.userJams} propsFn={props.history} userID={props.match.params.userId} jamID={props.match.params.jamId}/>}}/>
                
                {/* * * *  JAM * * * */}
                <Route path="/jam/:jamId" exact render = {(props) => { return <HeaderJam propsFn={props.history} patID={props.match.params.patientId} />}}/> 

                {/* * * *  CHAT * * * */}

              </Switch>

            </div>

            <div className="appBody">
                
              <Switch>    
                <Route path="/sign_in" render = {(props) => {return <Login propsFn={props.history}/>}}/>
                <Route path="/register" render = {(props) => {return <Register propsFn={props.history}/>}}/> 
                <Route path="/home/:userId/*" exact render = {(props) => { return <Home userJams={this.state.userJams} userID={props.match.params.userId}/>}}/> 
                <Route path="/home/:userId/jam/:jamId" render = {(props) => { return <Home userJams={this.state.userJams} jamID={props.match.params.jamId} userID={props.match.params.userId}/>}}/>

              </Switch>

            </div>
          </div>

        </Router>
        
      </div>
    );
  }
}

export default App;
