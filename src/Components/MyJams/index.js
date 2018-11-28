import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// // MATERIAL UI
import AddButton from '../../Components/Accessories/AddButton';
import CreateJam from '../CreateJam';

// // DATA
import DataService from '../services/DataService';



// CSS
import './index.css';




export default class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      userId    : this.props.userID,
      userJams  : [],
      userChats : [],
    }
 
  };


  componentDidMount() {
    DataService.getUserInfo(this.props.userID)
    .then(result =>{
      this.setState({ userJams : result.jams });
      console.log('jams = ', this.state.userJams)
     
    }).catch(function (error) {   
      console.log(error);
    });
  };



  _renderJams(){
    
    return this.state.userJams.map((jam,j) => {
      return (
        <div className="jam-container">
          <Link className="jam-box" key={j} to={`/jam/${jam.id}`}> 
             <div className="info">
               <div className="upper-line">
                    <div className="title">
                        <h4>{jam.jamName} </h4>}
                    </div>
                </div>
               
             </div>
          </Link>
        </div>
      )
    })
  };

  // _renderChats(){
  //   return this.state.chats.map((chat,j) => {
  //     return (
  //       <div className="chat-container">
  //         <Link className="chat-box" key={j} to={`/single_jam_board/${chat.id}`}> 
          
  //           <div className="chat-img">
  //              {chat.img}
  //           </div>
           //  <div className="info">
          //       <div className="upper-line">
          //            <div className="title">
          //              <h4>{chat.name}</h4>
          //            </div>
          //            <div className="time">
          //              <p>{chat.time}</p>
          //            </div>
      //               
      //           </div>

      //           <div className="chat-text">
      //               <p>{chat.text}</p>
      //           </div>
      //       </div>
  //         </Link>
  //       </div>
  //     )
  //   })
  // };



  render() {

    return (
      <div className="myjams">
        
        {this._renderJams()}
        
        <div className="add-button">
          <Link to={`/new_join_jam/${this.state.userId}`}><AddButton/></Link>
        </div>

        
      </div>
    )
  }

};



