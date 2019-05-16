import React, { Component } from 'react';

// COMPONENTS
import JamInfo from './FlatMates/JamInfo';
import Board from "./FlatMates/Board";
import Jammers from './FlatMates/Jammers';
import Chat from './ChatRoom/Chat';

import './index.css';

// DATA SERVICE
import DataService from '../../services/DataService';

export default class Jam extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId      : this.props.userId,
      userJams    : this.props.userJams,

      jamId       : this.props.jamId,
      adminId     : '',
      jamName     : '',
      jammers     : [],
      jamType     : '',

      userIsAdmin : false,
      
      showBoard   : true,
      showJamInfo : false,
      showJammers : false,
    };

    console.log('userJams en Jam state :', this.state.userJams);


    this.showBoard = this.showBoard.bind(this);
    this.showJammers = this.showJammers.bind(this);
    this.showJamInfo = this.showJamInfo.bind(this);
    this.updateJamIdInJam = this.updateJamIdInJam.bind(this);
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log('CDU JAm prev / this => ', prevProps.jamId, ' / ', this.props.jamId)
    if(this.props.jamId !== prevProps.jamId){
     
      DataService.getJamInfoById(this.props.jamId)
      .then(result => {     
        
        let adminId = result.adminId;
  
        if(this.state.userId === adminId){

          this.setState({
            adminId : adminId,
            userIsAdmin: true,
            jamId: this.props.jamId,
            jamType: result.jamType,
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
            jamType: result.jamType,
            jammers: result.jammers,
            showBoard   : true,
            showJamInfo : false,
            showJammers : false,
          });
        };
       
        console.log('el state en el jam luego del CDU ', this.state)

      }).catch(function (error) {   
        console.log(error);
      });

        
    };

    if(this.props.userJams !== prevProps.userJams){

      this.setState({
        userJams: this.props.userJams,
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

  updateJamIdInJam(x){
    // console.log('update Jam OK');
    this.setState({
      jamId: x,
    })
    this.props.updateJamIdInHome(x)
  };
  
  render() {
    console.log('userJams en Jam render :', this.state.userJams);

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
                  userId={this.state.userId} 
                  jamId={this.state.jamId}
                  admin={this.state.userIsAdmin}
                />
              }

              {this.state.showBoard &&
                <Board 
                  userId={this.state.userId} 
                  jamId={this.state.jamId}
                />
              }
              
              {this.state.showJammers &&
                <Jammers 
                  userId={this.state.userId} 
                  jamId={this.state.jamId}
                  jammers={this.state.jammers}
                  updateJamIdinJam={this.updateJamIdInJam}
                  userJams={this.state.userJams}
                /> 
              }


            </div>
          
        </div>

    );
  };
};






