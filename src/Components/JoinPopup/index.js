import React, {Component} from "react";

// SERVICES
import DataService from "../services/DataService";
import Calculations from "../services/Calculations";

// ACCESSORIES
import SubmitButton from '../ACCESSORIES/SubmitButton';
import CancelButton from '../ACCESSORIES/CancelButton';

export default class JoinPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup : true,

      userId    : this.props.userID,
      userName  : '',
      userJams  : this.props.userJams,
      
      jamToJoin : {},
    };

    this.onJoinJam = this.onJoinJam.bind(this);
  }

  componentDidMount(){
    DataService.getUserInfo(this.state.userId)
    .then(result =>{
      let userJams = result.userJams;
      this.setState({
        userName: result.email,
        userJams: userJams
      })
    })
  };

  onChangeState(field, value) {
    let jamInfo = this.state;
    jamInfo[field] = value;
    this.setState(jamInfo);
  }

  onJoinJam(e){
    e.preventDefault();

    let transJams = [];
    transJams = [...this.state.userJams];
    

    DataService.getJamInfoByCode(this.state.jamCode)
    .then(result =>{     
      let jam = result.data;
      let jamId = result.id;
      let joinedAt = new Date();

      let jamCode = jam.jamCode;

      console.log('result.data = ', result.data)
      let jamToJoin = {};
      jamToJoin.adminId = jam.adminId;
      jamToJoin.jamCode = jamCode;
      jamToJoin.jamName = jam.jamName;
      jamToJoin.jamId = jamId;
      jamToJoin.jamDescription = jam.jamDescription;
      jamToJoin.createdAt = jam.createdAt;
      jamToJoin.joineddAt = joinedAt;
      jamToJoin.jammers = jam.jammers;

      console.log('jamToJoin.jammers = ', jamToJoin.jammers)
      jamToJoin.jammers.push({name: this.state.userName, userId: this.state.userId})

      this.setState({
        jamToJoin : jamToJoin,
      })



      console.log('this.state.userId, transJams', this.state.userId, ' / ', transJams);

      let transJammers = jamToJoin.jammers
      DataService.updateJammersInJam(jamId, transJammers);

      transJams.push(this.state.jamToJoin)
      DataService.updateJamsArrayInUser(this.state.userId, transJams);
      this.props.closePopup();

    }).catch(function (error) {   
      console.log(error);
    });
    
  };

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>

          <div className="popup_inner_title">
            <h1>JOIN A JAM  !</h1>
            <p>Input the jam code</p>
          </div>
          
        <form className="createJam-form-container" onSubmit={this.onJoinJam}>

          <label id="label-short">
              <h5>Jam Code</h5>
              <input
                  className="input-short"
                  type="text"
                  name="jamCode"
                  size="350"
                  value={this.state.jamCode}
                  onChange={e => {
                      this.onChangeState("jamCode", e.target.value);
                  }}
              />
          </label>

          <div className="createJam-button-area">

            <div className="createJam-button" id="create-button-left">
              <CancelButton text="Cancel" fn={this.props.closePopup}/>
            </div>

            <div className="createJam-button" id="create-button-right">
              <SubmitButton text={"Join"}/>
            </div>

          </div>
            
        </form>


        </div>
      </div>
    );
  }
}

