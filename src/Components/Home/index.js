import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// // MATERIAL UI
// import AddButton from '../../Components/Accessories/AddButton';

// // DATA
// import DataService from '../services/DataService';
// import Calculations from '../services/Calculations';


// CSS
import './index.css';




export default class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      userID    : this.props.userID,
      jams      : [],
    }
 
  };


  // componentDidMount() {
  //   if (this.state.userId) {
  //   }
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
        
      </div>
    )

  }
}



