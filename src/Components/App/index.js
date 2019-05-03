import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// COMPONENTS
import Login from '../ACCESS/Login';
import Register from '../ACCESS/Register';
import Home from '../HOME';

// * * *  HEADERS * * * 
import HeaderLanding from '../HEADERS/HeaderLanding';
import HeaderLogIn from '../HEADERS/HeaderLogIn';
import HeaderHome from '../HEADERS/HeaderHome';
import HeaderJam from '../HEADERS/HeaderJam';
// import HeaderChat from '../HEADERS/HeaderChat';

// BODIES
import MyJams from '../HOME/MyJams';
import NewJoinJam from '../NewJoinJam';
import Jam from '../JAMS/Jam';

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
      user  : null,
      nav   : '',
      jam   : [],
      chat  : [],
    }

    this.navJam   = this.navJam.bind(this);
    this.navChat  = this.navChat.bind(this);
  }


  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        this.setState({user : user});
        console.log('el user en App', this.state.user);
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
    const { user, nav, jam, chat } = this.state;
    return (
      <div>

        <Router>

          <div className="app">

           {/* * * * * * * HEADERS * * * * * * */}
            <div className="app-header">  
              
              <Switch>

                <Route path="/"  exact render = {() => { return  <HeaderLanding/>}}/>
                <Route path="/pirulo"  exact render = {() => { return  <HeaderLogIn />}}/>
      
                {/* * * *  HOME * * * */}
                <Route path="/home/:userId" exact render = {(props) => { return <HeaderHome userID={props.match.params.userId}/>}}/>
                
                {/* * * *  JAM * * * */}
                <Route path="/jam/:jamId" exact render = {(props) => { return <HeaderJam propsFn={props.history} patID={props.match.params.patientId} />}}/> 

                {/* * * *  CHAT * * * */}
                {/* <Route path="/chat/:cahtId" exact render = {(props) => { return <HeaderChat propsFn={props.history} patID={props.match.params.patientId} />}}/>  */}

              </Switch>

            </div>

            {/* * * * * * * BODIES * * * * * * */}
            <div className="app-body">

              <Switch>
                <Route path="/sign_in" render = {(props) => {return <Login propsFn={props.history}/>}}/>
                <Route path="/register" render = {(props) => {return <Register propsFn={props.history}/>}}/> 

                {/* * * *  HOME * * * */}
                <Route path="/home/:userId" exact render = {(props) => { return <Home userID={props.match.params.userId}/>}}/>
                <Route path="/new_join_jam/:user" render = {(props) => { return <NewJoinJam propsFn={props.history} userID={props.match.params.user}/>}}/>
                
                {/* * * *  JAM * * * */}
                <Route path="/jam/:jamId" render = {(props) => { return <Jam propsFn={props.history} jamID={props.match.params.jamId} navJam={this.navJam}/>}}/>
                
                {/* * * *  CHAT * * * */}

              </Switch>

            </div>

          </div>

        </Router>
        
      </div>
    );
  }
}

export default App;
