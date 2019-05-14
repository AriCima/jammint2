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

      jamCode     : this.props.jamCode,
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
  
  componentDidMount(){
    // console.log('CDM launched');
    // DataService.getJamInfo(this.state.jamCode)

    // .then(result =>{     
    //   console.log('result en el Jam :', result)
    //   let adminId = result.data.adminId;
    //   let jamAdmin = false;

    //   console.log('this.state.userId / adminId  ', this.state.userId, ' / ', adminId)

    //   if(this.state.userId === adminId){
    //     console.log('this.state.userId === adminId => ', this.state.userId, ' / ', adminId)
    //     this.setState({
    //       adminId : adminId,
    //       userIsAdmin: true,
    //       Jammers   : result.data.jammers
    //     });
    //     console.log('actualización jamAdmin', this.state.userIsAdmin)
    //   };

    //   this.setState({ 
    //     jamCode   : result.jamCode,
    //     adminId   : jamAdmin,
    //     Jammers   : result.data.jammers
    //   });
     
    // }).catch(function (error) {   
    //   console.log(error);
    // });

    DataService.getJamInfoBis(this.state.jamId)

    .then(result =>{     
      console.log('result en el Jam :', result)
      let adminId = result.adminId;
      let jamAdmin = false;

      console.log('this.state.userId / adminId  ', this.state.userId, ' / ', adminId)

      if(this.state.userId === adminId){
        console.log('this.state.userId === adminId => ', this.state.userId, ' / ', adminId)
        this.setState({
          adminId : adminId,
          userIsAdmin: true,
          Jammers   : result.jammers
        });
        console.log('actualización jamAdmin', this.state.userIsAdmin)
      };

      this.setState({ 
        jamCode   : result.jamCode,
        adminId   : jamAdmin,
        Jammers   : result.jammers
      });
     
    }).catch(function (error) {   
      console.log(error);
    });
  };

  componentDidUpdate(prevProps, prevState) {

    if(this.state.showBoard !== prevState.showBoard) {
      this.setState({
        showBoard: !prevState.showBoard,
        showJammers: !prevState.showJammers,
      });
    };

    // if(this.props.jamCode !== prevProps.jamCode){
     
    //   DataService.getJamInfo(this.props.jamCode)
    //   .then(result => {     
    //     console.log('result en el Jam :', result)
    //     let adminId = result.data.adminId;
  
    //     if(this.state.userId === adminId){

    //       this.setState({
    //         adminId : adminId,
    //         userIsAdmin: true,
    //         jamCode: this.props.jamCode,
    //         jammers: result.data.jammers,
    //       });

    //     }else{
    //       this.setState({
    //         adminId : adminId,
    //         userIsAdmin: false,
    //         jamCode: this.props.jamCode,
    //         jammers: result.data.jammers,
    //       });
    //     };
       
    //   }).catch(function (error) {   
    //     console.log(error);
    //   });

    // };

    console.log('this.props.jamId !== prevProps.jamId', this.props.jamId, ' / ', prevProps.jamId)
    if(this.props.jamId !== prevProps.jamId){
     
      DataService.getJamInfoBis(this.props.jamId)
      .then(result => {     
        console.log('result en el Jam :', result)
        
        let adminId = result.adminId;
  
        if(this.state.userId === adminId){

          this.setState({
            adminId : adminId,
            userIsAdmin: true,
            jamCode: this.props.jamId,
            jammers: result.jammers,
            
          });

        }else{
          this.setState({
            adminId : adminId,
            userIsAdmin: false,
            jamCode: this.props.jamId,
            jammers: result.jammers,
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
              jamCode={this.state.jamCode}
              admin={this.state.userIsAdmin}
            />
          }
          {this.state.showBoard &&
            <Board 
              user={this.props.user} 
              jamCode={this.state.jamCode} 
              jamId={this.state.jamId}
            />
          }
          {this.state.showJammers &&
            <Jammers 
              user={this.props.user} 
              jamCode={this.state.jamCode}
              jammers={this.state.jammers}
            /> 
          }


        </div>
 
      </div>
    );
  }
}






