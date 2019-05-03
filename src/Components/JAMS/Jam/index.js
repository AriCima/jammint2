import React, { Component } from 'react';

// COMPONENTS
import Board from "../Board";
import Jammers from '../Jammers';

import './index.css';

// DATA SERVICE
import DataService from '../../services/DataService';

export default class Jam extends Component {
  constructor(props){
    super(props);
    this.state = {
      jamId   : this.props.jamID,
      jamName : '',
      showBoard: true,
      showJammers: false,
    }

    this.showBoard = this.showBoard.bind(this);
    this.showJammers = this.showJammers.bind(this);
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

  showBoard(){
    this.setState({
      showBoard: true,
      showJammers: false,
    })
    console.log('Board => Board = ', this.state.showBoard, ', jammers = ',this.state.showJammers)
  };

  showJammers(){
    this.setState({
      showBoard: false,
      showJammers: true,
    })
    console.log('Jammers => Board = ', this.state.showBoard, ', jammers = ',this.state.showJammers)
  };

  
  render() {

    return (
      
      <div className="jam">
        <div className="jam-header">

          <div className="jam-header-block">
            <button onCLick={this.showBoard}>Board</button>
          </div>

          <div className="jam-header-block">
          <button onCLick={this.showJammers}>Jammers</button>
          </div>

        </div>

        <div className="jam-filed">
          {this.state.showJammers === true ? <Jammers user={this.props.user} jamID={this.state.jamId}/> : <Board user={this.props.user} jamID={this.state.jamId}/>}
        </div>
 
      </div>
    );
  }
}






