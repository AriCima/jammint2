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
      userName  : '',
      userJams  : [],
      userChats : [],
    }
 
  };


  componentDidMount() {
    DataService.getUserInfo(this.props.userID)
    .then(result =>{
      let userJams = result.userJams;

      this.setState({ 
        userJams : userJams,
      });
     
    }).catch(function (error) {   
      console.log(error);
    });
  };



  _renderJams(){

    let jams = this.state.userJams

    return jams.map((jam,j) => {
      return (
        <div className="jam-container" key={j}>
          
          <div className="info">
            <div className="upper-line">
              <div className="title">
                  <h4>{jam.jamName}</h4>
                  <p>{jam.jamId}</p>
              </div>
            </div>
          </div>

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



