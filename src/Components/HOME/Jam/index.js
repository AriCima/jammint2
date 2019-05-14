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
      userId      : this.props.userID,

      // jamCode     : this.props.jamCode,
      jamId       : this.props.jamId,
      adminId     : '',
      jamName     : '',
      jammers     : [],

      userIsAdmin : false,
      

      showBoard   : true,
      showJamInfo : false,
      showJammers : false,
    };

    this.showBoard = this.showBoard.bind(this);
    this.showJammers = this.showJammers.bind(this);
    this.showJamInfo = this.showJamInfo.bind(this);
  };

  componentDidUpdate(prevProps, prevState) {
    if(this.props.jamId !== prevProps.jamId){
     
      DataService.getJamInfoById(this.props.jamId)
      .then(result => {     
        
        let adminId = result.adminId;
  
        if(this.state.userId === adminId){

          this.setState({
            adminId : adminId,
            userIsAdmin: true,
            jamId: this.props.jamId,
            jammers: result.jammers,
            showBoard   : true,
            showJamInfo : false,
            showJammers : false
          });

        }else{
          this.setState({
            adminId : adminId,
            userIsAdmin: false,
            jamId: this.props.jamId,
            jammers: result.jammers,
            showBoard   : true,
            showJamInfo : false,
            showJammers : false,
          });
        };
       
      }).catch(function (error) {   
        console.log(error);
      });

    };
    
  };

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

          {this.state.userIsAdmin && 
            <div className="jam-header-block">
              <button onClick={this.showJammers}>Settings</button>
            </div>
          }

        </div>

        <div className="jam-field">
          {this.state.showJamInfo &&
            <JamInfo 
              user={this.props.user} 
              jamId={this.state.jamId}
              admin={this.state.userIsAdmin}
            />
          }
          {this.state.showBoard &&
            <Board 
              user={this.props.user} 
              jamId={this.state.jamId}
            />
          }
          {this.state.showJammers &&
            <Jammers 
              user={this.props.user} 
              jamId={this.state.jamId}
              jammers={this.state.jammers}
            /> 
          }


        </div>
 
      </div>
    );
  }
}






