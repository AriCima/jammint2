import React, { Component } from 'react';

// COMPONENTS
import Chat from './ChatRoom';
import FlatMates from './FlatMates'

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
      jamType     : '',
      jamCode     : '',

      //exclusive for flatmates
      jamName     : '',
      jammers     : [],
      userIsAdmin : false,
      boardMessages: [],

      //exclusive for chat
      chatMessages: [],

    };

    this.updateJamIdInJam = this.updateJamIdInJam.bind(this);
  };


  componentDidUpdate(prevProps, prevState) {
    
    if(this.props.jamId !== prevProps.jamId){
     
      DataService.getJamInfoById(this.props.jamId)
      .then(result => {     
        
        let adminId         = result.adminId;
        let jamType         = result.jamType;
        let jamName         = result.jamName;
        let jamDescription  = result.jamDescription;
        let jammers         = result.jammers;
        let jamCode         = result.jamCode;
        let createdAt       = result.createdAt;
        let updatedAt       = result.updatedAt;

        if(jamType === "flatmates"){
          console.log('jamType = flatmates ')
          let evaluateAdmin   = false;

          // Evalúo si el user es a la vez el admin del Jam
          if(this.state.userId === adminId){
            evaluateAdmin = true;
          };

          this.setState({
            adminId         : adminId,
            userIsAdmin     : evaluateAdmin,
            jamId           : this.props.jamId,
            jamType         : jamType,
            jamCode         : jamCode,
            createdAt       : createdAt,
            updatedAt       : updatedAt,
            jamName         : jamName, 
            jamDescription  : jamDescription,
            jammers         : jammers,

          });
        } else if (jamType === "chat"){
          console.log('jamType = chat ')
          this.setState({
            adminId         : adminId,
            jamId           : this.props.jamId,
            jamType         : jamType,
            jamCode         : jamCode,
            createdAt       : createdAt,
            updatedAt       : updatedAt,
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

  updateJamIdInJam(x){
    // console.log('update Jam OK');
    this.setState({
      jamId: x,
    })
    this.props.updateJamIdInHome(x)
  };
  
  render() {
    console.log('jamId en el render de Jam :', this.state.jamid);
    return (
      <div>
{/* 
        {this.state.jamId === undefined ? <h1>SELECT YOUR JAM</h1> : 
          
          <div className="jam">

            {this.state.jamType === 'chat' && 
              <Chat 
                userId={this.state.userId}
                jamId={this.state.jamId}
                createdAt={this.state.createdAt}
                updatedAt={this.state.updatedAt}
              />
            }
            
            {this.state.jamType === "flatmates" &&
              <FlatMates
                userId={this.state.userId} 
                jamId={this.state.jamId}
                jammers={this.state.jammers}
                updateJamIdInJam={this.updateJamIdInJam}
                userJams={this.state.userJams}
                userIsAdmin={this.state.userIsAdmin}
                createdAt={this.state.createdAt}
                updatedAt={this.state.updatedAt}
              />
            }

          </div>
        } */}
        THIS IS A JAM
      </div>
    );
  };
};






