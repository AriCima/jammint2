import React, { Component } from "react";

import "./index.css";

export default class Jammers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jammers: this.props.jammers,
      jamId: this.props.jamId,
    };
    console.log('props.jammers ', this.props.jammers);
  };

  componentDidUpdate(prevProps, prevState){
    if (prevProps.jammers !== this.props.jammers){
      this.setState({
        jammers: this.props.jammers,
      });
    };
  };

  _renderJammers() {
    return this.state.jammers.map((user, i) => {
      return (
        <div className="room-cover" key={i} >
          <div className="user-pic">
            <img src={require("../../../../assets/icons/user.png")} alt="user"/>
          </div>

          <div className="user-info">
            <div className="user-info-up">

              <div className="user-info-detail">
                <h4>{user.name}</h4>
              </div>

            </div>

            <div className="user-info-down">
              <div className="user-info-studies">
                <p>Economy</p>
              </div>

              <div className="user-info-school">
                <p>Universitat de Barcelona</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="jammers">
        <p>THIS IS JAMMERS</p>
        {this._renderJammers()}
      </div>
    );
  }
}
