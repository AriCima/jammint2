import React, { Component } from 'react';

import DataService from '../../services/DataService';

import './index.css';

export default class JamInfo extends Component {
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

  // componentDidMount(){
  //   console.log("Se ejecuta ComponenDidMount");
  //   DataService.getBoardMessages(this.props.jamID).then(
  //     (boardMessagesResult) => {
  //       console.log("Mensajes del Board recibidos desde Firebase:", boardMessagesResult)

  //       // hacer setState del array result
  //       this.setState({messagesInBoard: boardMessagesResult})

  //     }
  //   )  

  //   DataService.getJammers(this.props.jamId).then(
  //     (jammers) => {
  //       console.log("Jammers recibidos desde Firebase:", jammers)

  //       // hacer setState del array result
  //       this.setState({jammers: jammers})

  //     }
  //   )  
  // }

  render() {

    return (

      <div className="jam-info">

        <div className="jam-Info-content" id="jam-content">
         
          <p>THIS IS JAM INFO</p>

        </div>

      </div>
      

    );
  }
}






