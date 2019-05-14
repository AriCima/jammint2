import React from "react";

// CSS
import "./index.css";

export default class JamCover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jamName: this.props.name,
      jamDescription: this.props.desc,
      jamCode: this.props.code,
      jamId: this.props.jamId
    };

    this.onJamClick = this.onJamClick.bind(this);
  }

  onJamClick(){
    this.props.updateJamScreenInList(this.state.jamCode, this.state.jamId);
  };

  render() {
    return (

      <button className="jam-container" onClick={this.onJamClick}>

        <div className="jams-list-content">
          <h4>{this.state.jamName}, {this.state.jamId} </h4>
        </div>

        <div className="jams-list-content">
          <p>{this.state.Description}</p>
        </div>

      </button>
    )
  }
}