import React, { Component } from "react";

import StartChat from './StartChat';

import "./index.css";

export default class Jammers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jammers: this.props.jammers,
      jamId: this.props.jamId,
      userId: this.props.userId,
      userJams: this.props.userJams,
    };
    console.log('userJams en el JAmmers', this.state.userJams)
    this.updateJamIdInState = this.updateJamIdInState.bind(this);
  };

  componentDidUpdate(prevProps, prevState){
    if (prevProps.jammers !== this.props.jammers){
      this.setState({
        jammers: this.props.jammers,
      });
    };
  };

  updateJamIdInState(x){
    this.props.updateJamIdInJam(x)
  };

  _renderJammers() {
    return this.state.jammers.map((user, i) => {
      return (
        <div className="room-cover" key={i} >

          <div className="user-pic">
            <img src={require("../../../../../assets/icons/user.png")} alt="user"/>
          </div>

          <div className="user-info">

            <div className="user-info-up">

              <div className="user-info-detail">
                <h4>{user.name} - {user.userId}</h4>
              </div>

              <div className="user-info-detail">
                <StartChat
                  userId={this.state.userId}
                  chatterId={user.userId}
                  userJams={this.state.userJams}
                  updateJamIdinJammers={this.updateJamIdInState}
                />
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
