import React, { Component } from 'react';


import './index.css';
import DataService from '../services/DataService';


export default class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId    : this.props.userID,
      jamName   : '',
    }

  }

  componentDidMount(){
    DataService.getChatMessages(this.state.jamId)
    .then(result =>{     
      this.setState({ jamName : result.jamName });
      
      this.props.navJam(this.state.jamId, this.state.jamName);
     
    }).catch(function (error) {   
      console.log(error);
    });
  };


  
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






