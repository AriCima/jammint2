import React, { Component } from 'react';

import DataService from '../../../services/DataService';

import './index.css';

export default class JamInfo extends Component {
  constructor(props){
    super(props);

    this.state = {
      jamCode         : this.props.jamCode,
      userIsAdmin        : this.props.admin,
      messagesInBoard : [],
    }

    this.sendNewMessage = this.sendNewMessage.bind(this);
  }

  sendNewMessage(e){
    e.preventDefault();

    console.log('SendNewMessage() en ejecución');

    let date = new Date;
    let messageDate = date.getTime();
    let user = this.props.user.id
    let messageId= user.concat(messageDate.toString());

    let messageToSave = {
      userId      : user,
      userName    : this.props.user.name,
      text        : this.state.messageText,
      date        : messageDate, 
      messageId   : messageId,
      jamId       : this.state.jamID,
    }

    DataService.saveNewMessage(messageId, messageToSave)

  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.jamCode !== prevProps.jamCode){
      this.setState({
          jamCode: this.props.jamCode
      })
    };
    if(this.props.admin !== prevProps.admin){
      this.setState({
        userIsAdmin: this.props.admin
      })
    };
  };


  render() {
    console.log('Am I the Jam Admin ?: ', this.state.userIsAdmin);
    let text ='';

    if(this.state.userIsAdmin){
      text = 'true';
    } else {
      text = 'false';
    };

    return (

      <div className="jam-info">

        <div className="jam-Info-content" id="jam-content">
         
          <p>THIS IS JAM {this.state.jamCode}</p>
          <p>Am I the Jam Admin  {text}</p>

        </div>

      </div>
      

    );
  }
}






