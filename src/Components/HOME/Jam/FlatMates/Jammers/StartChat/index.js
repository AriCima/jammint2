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
      chatterId       : this.props.chatterId,
      jamCode         : '',

      userJams        : this.props.userJams,
      chattereJams     : [],

      jamType         : 'chat',
      jamId           : '',
      messages        : [],
      createdAt       : '',
      updatedAt       : '',
    };

    console.log('userJams en el startChat: ', this.state.userJams)
    this.startChat = this.startChat.bind(this);
  };

  componentDidMount(){
    
    DataService.getUserInfo(this.state.chatterId)

    .then(result =>{
      console.log('result en el get user info : ', result)
      let userJams = result.userJams;

      this.setState({
        userName: result.email,
        chatterJams: userJams,
      });
    });
  };


  startChat(e){
    e.preventDefault();
    
    console.log('start chat state : ', this.state)

    let userID = this.state.userId;
    let chatterID = this.state.chatterId;

    let transJamCode = Calculations.sortAsc([userID, chatterID]);

    let jamCode = transJamCode.join("-");

    let transUserJams = [...this.state.userJams];
    let transChatterJams = [...this.state.chattereJams];
    console.log('1) transUserJams / transChatterJams antes del push',transUserJams, ' / ', transChatterJams )

    let createdAt = new Date();
    
    let newJam = {
      jamCode: jamCode,
      createdAt: createdAt,
      jamType: 'chat',
      updatedAt: createdAt,
      messages: [],
    };


    console.log('Jam Type "chat :', newJam);
    DataService.createJamBeta(newJam)
    .then((result)=>{
      // console.log('el result del create Jam = ', result)
      let jamId = result.id;
      let userID = this.state.userId;

      newJam.jamId = jamId;
      newJam.jammers = [userID];
      console.log('transUserJams / transChatterJams antes del push',transUserJams, ' / ', transChatterJams )

      transUserJams.push(newJam);
      transChatterJams.push(newJam);

      console.log('transUserJams / transChatterJams ',transUserJams, ' / ', transChatterJams )
      DataService.updateJamsArrayInUser(userID, transUserJams);
      DataService.updateJamsArrayInUser(chatterID, transChatterJams);

      this.props.updateJamIdinJammers(jamId);


    },(error)=>{
        console.log('Chat could not be created, error:', error);
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

