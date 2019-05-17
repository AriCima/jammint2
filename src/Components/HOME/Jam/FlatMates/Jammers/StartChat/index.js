import React, {Component} from "react";

// SERVICES
import DataService from "../../../../../services/DataService";
import Calculations from "../../../../../services/Calculations";

// ACCESSORIES
import ChatButton from '../../../../../ACCESSORIES/ChatButton';

export default class StartChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId          : this.props.userId,
      userJams        : this.props.userJams,

      chattereJams    : [],
      chatterJams     : [],

      chatterId       : this.props.chatterId,
      jamCode         : '',
      jamType         : 'chat',
      jamId           : '',
      chatMessages    : [],
      createdAt       : '',
      updatedAt       : '',
    };

    this.startChat = this.startChat.bind(this);
  };


  startChat(e){
    e.preventDefault();
    let userID        = this.state.userId;
    let transUserJams = [...this.state.userJams];

    let chatterID        = this.state.chatterId;

    let transJamCode  = Calculations.sortAsc([userID, chatterID]);
    let jamCode       = transJamCode.join("-");
    let createdAt     = new Date();



    let newJam = {
      jamCode       : jamCode,
      jamType       : 'chat',
      updatedAt     : createdAt,
      createdAt     : createdAt,
      user1         : this.state.userId,
      usdr2         : this.state.chatterId,
      chatMessages  : [],
    };


    // Get CHATTER info in order to update her/his userJams
    DataService.getUserInfo(this.state.chatterId)
    .then(result =>{
      console.log('chatter name :', result.email, ' chatterJams :', result.userJams)

      let transChatterJams = result.userJams;

      // ADD THE JAM INTO JAMS COLLECTION
      DataService.createJamBeta(newJam)
      .then((result)=>{
        let jamId = result.id;
        let userID = this.state.userId;
        let chatterID = this.state.chatterId;

        newJam.jamId = jamId;

  
        transUserJams.push(newJam);
        DataService.updateJamsArrayInUser(userID, transUserJams);

        transChatterJams.push(newJam);
        DataService.updateJamsArrayInUser(chatterID, transChatterJams);

        this.props.updateJamIdinJammers(jamId);

      },(error)=>{
          console.log('Chat could not be created, error:', error);
      });
    

    },(error)=>{
      console.log('User info could not be retreived:', error);
    });
  };

  render() {
    return (

      <div className="chatt-button" id="cchatt-button-right">
        <ChatButton text={"chat"} fn={this.startChat}/>
      </div>

    );
  }
}

