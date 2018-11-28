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
      jams      : [],
      messages  : [],
    }
 
  };


  componentDidMount() {
    DataService.getUserJams(this.props.userID)
    .then(jms =>{
      this.setState({ jams : jms });
      console.log('jams = ', this.state.jams)
     
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



  _renderJams(){
    return this.state.jams.map((jam,j) => {
      return (
        <div className="jam-container">
          <Link className="jam-box" key={j} to={`/single_jam_board/${jam.id}`}> 
          
            {/* <div className="img">
               {jam.img}
            </div> */}
             <div className="info">

               <div className="upper-line">
                    <div className="title">
                        <h4>{jam.jamName} </h4>}
                    </div>
                    {/* <div className="time">
                       <p>{chat.time}</p>
                    </div> */}
                </div>
                {/* <div className="jam-text">
                    <p>{jam.text}</p>
                </div> */}
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

        <div>
          {this._renderJams()}
        </div>

        <div className="add-button">
          <Link to={`/new_jam/${this.state.userId}`}><AddButton/></Link>
        </div>

        
      </div>
    )
  }

};



