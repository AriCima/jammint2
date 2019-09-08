import React, { Component } from 'react';

import './index.css';

export default class ChatRoom extends Component {
  constructor(props){
    super(props);

    this.state = {
      jamId   : this.props.jamId,
      userId  : this.props.userId,
    };
  };

  componentDidUpdate(prevProps, prevState){
    console.log('CDU del Board launched ')
    if(this.props.jamId !== prevProps.jamId){
      this.setState({
        jamId: this.props.jamId
      });
    };

    if(this.props.admin !== prevProps.admin){
      this.setState({
        userIsAdmin: this.props.admin
      });
    };
  };

  // renderChatMessages(){
  //   let messages = this.state.chatMessages;

  //   messages.map((msg, j) => {
  //   return(
  //     <div className="single-message" key={j}>

  //       <p>msg.message</p>

  //     </div>
  //     )
  //   })

  // };

  render() {
    console.log('props received en chatroom ', this.props)
    return (

      <div className="chat-jumbo">
        THIS IS CHAT
{/*         
          <p>THIS IS THE CHAT : {this.state.jamId} </p>

        <div className="chat-messages-wrapper">
         
          {/* {this.renderChatMessages()} */}
{/* 
          <p>mensajes aquí</p>

        </div>

        <div className="send-chat-area">
          <form className="chat-form" onSubmit={this.sendMessage}>
            <textarea className="chat-input"
            
            />
            <div className="chat-send-button-area">
              <SubmitButton text={'send'}/>
            </div>
          </form>
        </div> */} */}

      </div>

    );
  }
}






