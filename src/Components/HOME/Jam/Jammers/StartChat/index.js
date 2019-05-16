import React, {Component} from "react";

// SERVICES
import DataService from "../../../../services/DataService";
import Calculations from "../../../../services/Calculations";

// ACCESSORIES
import ChatButton from '../../../../ACCESSORIES/ChatButton';

export default class StartChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId          : this.props.userID,
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

    this.startChat = this.startChat.bind(this);
  }

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
    console.log('userJams en el StartChat', this.state.userJams);
    
    let userID = this.state.userId;
    let chatterID = this.state.chatterId;

    let transJamCode = Calculations.sortAsc([userID, chatterID]);

    let jamCode = transJamCode.join("-");

    let transUserJams = [...this.state.userJams];
    let transChatterJams = [...this.state.chattereJams];

    let createdAt = new Date();
    
    let newJam = {
      jamCode: jamCode,
      createdAt: createdAt,
      jamType: 'chat',
      updatedAt: createdAt,
      messages: [],
    };



    DataService.createJamBeta(newJam)
    .then((result)=>{
      // console.log('el result del create Jam = ', result)
      let jamId = result.id;
      let userID = this.state.userId;

      newJam.jamId = jamId;
      newJam.jammers = [userID];

      transUserJams.push(newJam);
      transChatterJams.push(newJam);

      DataService.updateJamsArrayInUser(userID, transUserJams);
      DataService.updateJamsArrayInUser(chatterID, transChatterJams);

      this.props.updateJamIdinJammers(jamId);


    },(error)=>{
        console.log('Chat could not be created, error:', error);
    });
  };

  render() {
    return (
      <div className='popup'>

        <div className="createJam-button" id="create-button-right">
          <ChatButton text={"chat"} fn={this.startChat}/>
        </div>

      </div>
    );
  }
}

