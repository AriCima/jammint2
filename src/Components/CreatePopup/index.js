import React, {Component} from "react";

// SERVICES
import DataService from "../services/DataService";
import Calculations from "../services/Calculations";

// ACCESSORIES
import SubmitButton from '../ACCESSORIES/SubmitButton';
import CancelButton from '../ACCESSORIES/CancelButton';

export default class CreatePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup       : true,

      userId          : this.props.userID,
      userJams        : this.props.userJams,
      jamId           : "",
      jamName         : '',
      jamDescription  : '',
      createdAt       : "",
    };

    this.onCreateNewJam = this.onCreateNewJam.bind(this);
    console.log('state del create = ', this.state);
  }

  componentDidMount(){
    
    DataService.getUserInfo(this.state.userId)
    .then(result =>{
      let userJams = result.userJams;
      this.setState({
        userJams: userJams
      })
    })
  };

  onChangeState(field, value) {
    let jamInfo = this.state;
    jamInfo[field] = value;
    this.setState(jamInfo);
  };

  onCreateNewJam(e){
    e.preventDefault();
    console.log('userJams en el create', this.state.userJams)
    let userID = this.state.userId;
    
    let transJams = [];
    transJams = [...this.state.userJams];
    let createdAt = new Date();
    let jamCode = Calculations.generateCode();
    let newJam = {
      adminId: userID,
      jamCode: jamCode,
      jamName: this.state.jamName,
      jamDescription: this.state.jamDescription,
      createdAt: createdAt,
    };

    transJams.push(newJam)

    DataService.createJam(newJam)
    .then((result)=>{

      let userID = this.state.userId;

      DataService.updateJamsArrayInUser(userID, transJams);
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
          
        <form className="createJam-form-container" onSubmit={this.onCreateNewJam}>

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
              <CancelButton text="Cancel" onClick={this.props.closePopup}/>
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
