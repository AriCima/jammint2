import React from "react";

// SERVICE API
import DataService from "../services/DataService";

// ACCESSORIES
import SubmitButton from '../ACCESSORIES/SubmitButton';
import CancelButton from '../ACCESSORIES/CancelButton';

export default class CreateJam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId      : this.props.userID,
      jamId       : "",
      name        : '',
      description : '',
      createdAt   : "",

    };

    this.onCreateNewJam = this.onCreateNewJam.bind(this);
  }

  onChangeState(field, value) {
    let jamInfo = this.state;
    jamInfo[field] = value;
    this.setState(jamInfo);
  }

  onCreateNewJam(e){
    let userID = this.state.userId;
    e.preventDefault();

    let createdAt = new Date();

    let newJam = {
      jamAdmin: true,
      jamName: this.state.jamName,
      jamDescription: this.state.jamDesc,
      createdAt: createdAt,
    }

    DataService.createJam(newJam)
    .then((result)=>{
      console.log('el result es = ', result);

      let jamId = result.id;
      console.log('jamID = ', jamId);

      // DataService.addJamToUser(userID, jamId)

      this.props.propsFn.push(`/jam/${result.id}`)

    },(error)=>{
        console.log('Jam could not be created, error:', error);
    });
  };

  render() {
    return (

        <form className="createJam-form-container">

          <label id="label-short">
              <h5>Name</h5>
              <input
                  className="input-short"
                  type="text"
                  name="Name"
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
                  name="Description"
                  size="350"
                  value={this.state.description}
                  onChange={e => {
                      this.onChangeState("description", e.target.value);
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

    );
  }
}
