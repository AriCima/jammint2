import React, { Component } from 'react';

import DataService from '../../services/DataService';

import './index.css';

export default class Board extends React.Component {
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

  componentDidMount(){
    console.log("Se ejecuta ComponenDidMount");
    DataService.getBoardMessages(this.props.jamID).then(
      (boardMessagesResult) => {
        console.log("Mensajes del Board recibidos desde Firebase:", boardMessagesResult)

        // hacer setState del array result
        this.setState({messagesInBoard: boardMessagesResult})

      }
    )  

    DataService.getJammers(this.props.jamId).then(
      (jammers) => {
        console.log("Jammers recibidos desde Firebase:", jammers)

        // hacer setState del array result
        this.setState({jammers: jammers})

      }
    )  
  }

  render() {

    return (
      

      <div className="board">

        <div className="board-title">
          <h4>PUBLIC BOARD</h4>
        </div>

        <div className="board-content" id="board-content">
         
          <div className="whole-message">

          {/* {this.state.messagesInBoard.map((messageItem, i) => {
                  const jammer = this.state.jammers.filter((j)=>{j.id == messageItem.userId})[0]
                  if(!jammer) console.log("Messageitem", messageItem);
                  return <div key={i}>
                  <div className="jammer">
                    {jammer ? jammer.name : messageItem.userName}
                  </div>
                  <div className="board-messages">
                  {messageItem.text}
                  </div>
                  
                  </div>
            })} */}
            
          </div>

        </div>
      
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
      </div>
      

    );
  }
}






