import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import DataService from "../../../services/DataService";

import "./index.css";

export default class Jammers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jamCode: this.props.jamCode,
      jammers: this.props.jammers,
    };
    console.log('props.jammers ', this.props.jammers);
  }

    // componentDidMount(){
    //   DataService.getJammers(this.props.jamId).then(
    //       (jamsData)=>{

    //       this.setState({ jammers: jamsData})

    //       }
    //   )
    // }

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
