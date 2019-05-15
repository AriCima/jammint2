import React, {Component} from "react";

// SERVICES
import DataService from "../../../../services/DataService";
import Calculations from "../../../../services/Calculations";

// ACCESSORIES
import SubmitButton from '../ACCESSORIES/SubmitButton';

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

    this.StartChat = this.StartChat.bind(this);
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


  StartChat(e){
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

      this.props.closePopup();

      // this.props.propsFn.push(`/home/${userId}`)

    },(error)=>{
        console.log('Jam could not be created, error:', error);
    });
  };

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>

          <div className="popup_inner_title">
            <h1>CREATE YOUR OWN JAM IN ONE STEP !</h1>
          </div>
          
        <form className="createJam-form-container" onSubmit={this.StartChat}>

          <label id="label-short">
              <h5>Name</h5>
              <input
                  className="input-short"
                  type="text"
                  name="jamName"
                  size="350"
                  value={this.state.jamName}
                  onChange={e => {
                      this.onChangeState("jamName", e.target.value);
                  }}
              />
          </label>

          <label id="label-textarea">
              <h5>Description</h5>
              <textarea
                  className="textarea"
                  type="text"
                  name="description"
                  size="350"
                  value={this.state.jamDescription}
                  onChange={e => {
                      this.onChangeState("jamDescription", e.target.value);
                  }}
              />
          </label>

          <div className="createJam-button-area">

            <div className="createJam-button" id="create-button-left">
              <CancelButton text="Cancel" fn={this.props.closePopup}/>
            </div>

            <div className="createJam-button" id="create-button-right">
              <SubmitButton text={"Create"} fn={this.onNewEvent}/>
            </div>

          </div>
            
        </form>


        </div>
      </div>
    );
  }
}

