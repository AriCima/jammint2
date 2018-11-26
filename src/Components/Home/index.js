import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// // MATERIAL UI
import AddButton from '../../Components/Accessories/AddButton';

// // DATA
import DataService from '../services/DataService';



// CSS
import './index.css';




export default class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      userID    : this.props.userID,
      jams      : [],
      messages  : [],
    }
 
  };


  componentDidMount() {
    DataService.getUserJams(this.props.userID)
    .then(jms =>{
      this.setState({ jams : jms });
     
    }).catch(function (error) {   
      console.log(error);
    });

    DataService.getUserMessages(this.props.userID)
    .then(chts =>{
      this.setState({ messages : chts });
     
    }).catch(function (error) {   
      console.log(error);
    })
  };



  // _renderJams(){
  //   return this.state.jams.map((jam,j) => {
  //     return (
  //       <div className="jam-container">
  //         <Link className="jam-box" key={j} to={`/single_jam_board/${jam.id}`}> 
          
  //           <div className="jam-img">
  //              {jam.img}
  //           </div>
  //           <div className="jam-title">
  //               <h4>{jam.tenantName} </h4>}
  //           </div>
  //           <div className="jam-text">
  //               <p>{jam.text}</p>
  //           </div>
            
  //         </Link>
  //       </div>
  //     )
  //   })
  // };

  // _renderChats(){
  //   return this.state.chats.map((chat,j) => {
  //     return (
  //       <div className="chat-container">
  //         <Link className="chat-box" key={j} to={`/single_jam_board/${chat.id}`}> 
          
  //           <div className="chat-img">
  //              {chat.img}
  //           </div>
            
  //           <div className="chat-text">
  //               <p>{chat.text}</p>
  //           </div>
            
  //         </Link>
  //       </div>
  //     )
  //   })
  // };



  render() {

    return (
      <div className="home">

        <div className="left">
          <p>Hello</p>
        </div>

        <div className="right">
          <p>World</p>
        </div>

        <div>
          <Link to={`/new_jam/${this.state.userId}`}><AddButton/></Link>
        </div>
        
      </div>
    )

  }
};



