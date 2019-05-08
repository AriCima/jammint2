import React, { Component } from 'react';

// COMPONENTS
import JamInfo from './JamInfo';
import Board from "./Board";
import Jammers from './Jammers';

import './index.css';

// DATA SERVICE
import DataService from '../../services/DataService';

export default class Jam extends Component {
  constructor(props){
    super(props);
    this.state = {
      jamId   : this.props.jamID,
      jamName : '',
      showJamInfo: false,
      showBoard: true,
      showJammers: false,
    }

    this.showBoard = this.showBoard.bind(this);
    this.showJammers = this.showJammers.bind(this);
    this.showJamInfo = this.showJamInfo.bind(this);
  }

  componentDidMount(){
    DataService.getJamInfo(this.state.jamId)
    .then(result =>{     
      this.setState({ jamName : result.jamName });
      
      this.props.navJam(this.state.jamId, this.state.jamName);
     
    }).catch(function (error) {   
      console.log(error);
    });
  };

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.state.showBoard !== prevState.showBoard) {
      this.setState({
        showBoard: !prevState.showBoard,
        showJammers: !prevState.showJammers,
      });
    }
}

  showJamInfo() {
    this.setState({
      showJamInfo: true,
      showBoard: false,
      showJammers: false,
    })
  };

  showBoard() {
    this.setState({
      showJamInfo: false,
      showBoard: true,
      showJammers: false,
    })
  };

  showJammers() {
    this.setState({
      showJamInfo: false,
      showBoard: false,
      showJammers: true,
    })
  };

  
  render() {

    return (
      
      <div className="jam">
        <div className="jam-header">

          <div className="jam-header-block">
            <button onClick={this.showJamInfo}>JamInfo</button>
          </div>

          <div className="jam-header-block">
            <button onClick={this.showBoard}>Board</button>
          </div>

          <div className="jam-header-block">
          <button onClick={this.showJammers}>Jammers</button>
          </div>

        </div>

        <div className="jam-field">
          {this.state.showJamInfo ? this.state.showJammers ? 
            <Jammers user={this.props.user} jamID={this.state.jamId}/> : 
            <Board user={this.props.user} jamID={this.state.jamId}/> : 
            <JamInfo/>}
        </div>
 
      </div>
    );
  }
}






