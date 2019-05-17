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
      chatMessages  : [],
    };


    // Get CHATTER info in order to update her/his userJams
    DataService.getUserInfo(this.state.chatterId)
    .then(result =>{
      console.log('chatter name :', result.email, ' chatterJams :', result.userJams)

      let transChatterJams = result.userJams;
      let chatterName      = result.email;

      // ADD THE JAM INTO JAMS
      DataService.createJamBeta(newJam)
      .then((result)=>{
        let jamId = result.id;
        let userID = this.state.userId;

        newJam.jamId = jamId;
        newJam.admin = [userID];
        newJam.chatterName = chatterName;
     

        transUserJams.push(newJam);

        newJam.chatterName = 'User'
        transChatterJams.push(newJam);

        DataService.updateJamsArrayInUser(userID, transUserJams);
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

