import React, { Component } from 'react';


// DATA SERVICE
import DataService from '../../../services/DataService';

// COMPONENTS
import JamInfo from './JamInfo';
import Board from './Board';
import Jammers from './Jammers';

// CSS
import './index.css';

export default class FlatMates extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId      : this.props.userId,
      jamId       : this.props.jamId,
      jammers     : this.props.jammers,
      userJams    : this.props.userJams,
      userIsAdmin : this.props.userIsAdmin,
    
      adminId     : '',
      jamName     : '',

      jamType     : '',


      
      showBoard   : true,
      showJamInfo : false,
      showJammers : false,
    };



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
    this.props.updateJamIdInJam(x)
  };
  
  render() {
    console.log('jamId en FlatMates:', this.state.jamId);

    return (
        

        <div className="jam">  
        THIS IS JAMMERS
{/* 
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
                  updateJamIdInJam={this.updateJamIdInJam}
                  userJams={this.state.userJams}
                /> 
              }


            </div>
           */}
        </div>

    );
  };
};






