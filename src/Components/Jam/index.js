import React, { Component } from 'react';
import Board from "./Board";
import Jammers from './Jammers';

import './index.css';

export default class Jam extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      jamId   : this.props.jamID,
    }

  }
  
  render() {

    return (
      
      <div className="jam">

        <div className="jam-board">
          <Board user={this.props.user} jamID={this.state.jamId}/>
        </div>

        <div className="jam-right">

          <div className="jam-jammers">
            <Jammers user={this.props.user} jamID={this.state.jamId}/> 
          </div>
          
        </div>



      </div>
    );
  }
}






