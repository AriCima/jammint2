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
      userId    : this.props.userID,
      jamCode   : this.props.jamCode,
      adminId   : '',
      userIsAdmin  : false,
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
    console.log('CDM launched');
    DataService.getJamInfo(this.state.jamCode)

    .then(result =>{     
      console.log('result en el Jam :', result)
      let adminId = result.adminId;
      let jamAdmin = false;

      if(this.state.userId === adminId){
        console.log('this.state.userId === adminId => ', this.state.userId, ' / ', adminId)
        this.setState({
          adminId : adminId,
          userIsAdmin: true
        });
        console.log('actualización jamAdmin', this.state.userIsAdmin)
      };

      this.setState({ 
        jamCode : result.jamCode,
        adminId   : jamAdmin,
      });
     
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
    };

    if(this.props.jamCode !== prevProps.jamCode){
     
      DataService.getJamInfo(this.props.jamCode)
      .then(result => {     
        console.log('result en el Jam :', result)
        let adminId = result.adminId;
  
        if(this.state.userId === adminId){
          // console.log('this.state.userId === adminId => ', this.state.userId, ' / ', adminId)
          this.setState({
            adminId : adminId,
            userIsAdmin: true
          });
          // console.log('actualización jamAdmin', this.state.userIsAdmin)
        }else{
          this.setState({
            adminId : adminId,
            userIsAdmin: false,
          });
        };
       
      }).catch(function (error) {   
        console.log(error);
      });
    };

    if(this.props.adminId !== prevProps.adminId){
      if(this.props.adminId === this.state.userId){
        this.setState({
          adminId: this.props.adminId,
          userIsAdmin: true,
        })
      }else{
        this.setState({
          adminId: this.props.adminId
        })
      }
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
          {this.state.showJamInfo ? this.state.showJammers ? 
            <Jammers 
              user={this.props.user} 
              jamCode={this.state.jamCode}
            /> : 
            <Board 
              user={this.props.user} 
              jamCode={this.state.jamCode} 
            />:
            <JamInfo 
              user={this.props.user} 
              jamCode={this.state.jamCode}
              admin={this.state.userIsAdmin}
            />
          }
        </div>
 
      </div>
    );
  }
}






