import React, { Component } from 'react';

import DataService from '../../services/DataService';

import './index.css';

export default class SendMessage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      jamId           : this.props.jamID,
      messagesInBoard : [],
      jammers         : [],
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

  render() {

    return (
      
        <div className="send-area">
          
          <form onSubmit={this.sendNewMessage}>
            <input type="textarea" 
              placeholder="Message"
              value={this.state.messageText}
              onChange={ (event) => { this.setState({messageText: event.target.value}) } }
            />
            <button>Send</button>
          </form>

        </div>

    );
  }
}


