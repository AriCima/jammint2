import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


// API SERVICES
import DataService from '../services/DataService';

// COMPONENTS
import Login from '../Access/Login';
import Register from '../Access/Register';
import Header from '../Header';
import MyJams from '../MyJams';
import NewJoinJam from '../NewJoinJam';
import Jam from '../Jam';



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
          
            <div className="app-header">
              <Header user={user} nav={nav} jam={jam} chat={chat}/>}
            </div>
        
            <div className="app-body">

              <Switch>
                <Route path="/sign_in" render = {(props) => {return <Login propsFn={props.history}/>}}/>
                <Route path="/register" render = {(props) => {return <Register propsFn={props.history}/>}}/> 

                <Route path="/my_jams/:user" render = {(props) => { return <MyJams userID={props.match.params.user}/>}}/>
                <Route path="/new_join_jam/:user" render = {(props) => { return <NewJoinJam propsFn={props.history} userID={props.match.params.user}/>}}/>
                {/* <Route path="/create_jam/:user" render = {(props) => { return <CreateJam propsFn={props.history} userID={props.match.params.user}/>}}/> */}

                <Route path="/jam/:jamId" render = {(props) => { return <Jam propsFn={props.history} jamID={props.match.params.jamId} navJam={this.navJam}/>}}/>

              </Switch>


            </div>

          </div>

        </Router>
        
      </div>
    );
  }
}

export default App;
