import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// // DATA
import DataService from '../../services/DataService';

// CSS
import './index.css';




export default class MyJams extends Component {
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
      this.setState({ userJams : result.userJams });
     
    }).catch(function (error) {   
      console.log(error);
    });
  };



  _renderJams(){

    return this.state.userJams.map((jam,j) => {
      return (
        <div className="jam-container">
          <Link className="jam-box" key={j} to={`/jam/${jam.jamId}`}> 
             <div className="info">
               <div className="upper-line">
                    <div className="title">
                        <h4> MY JAMS </h4>}
                    </div>
                </div>
               
             </div>
          </Link>
        </div>
      )
    })
  };



  render() {

    return (
      <div className="myjams">
        
        {this._renderJams()}
        
      </div>
    )
  }

};



