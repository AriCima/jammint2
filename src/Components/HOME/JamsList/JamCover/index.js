import React from "react";

// SERVICE API
import DataService from "../../../services/DataService";

// CSS
import "./index.css";

export default class JamCover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jamName: this.props.name,
      jamDescription: this.props.desc,
      jamCode: this.props.code,
    };

    this.onJamClick = this.onJamClick.bind(this);
  }

  // componentDidMount() {
  //   DataService.getJamInfo(this.userId, this.props.jamId)
  //   .then(result => {
  //     let jamName = result.jamName;
  //     let jamDescription = result.jamDescription;

  //     this.setState({
  //       jamName: jamName,
  //       jamDescription: jamDescription,
  //     });
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });
  // };

  onJamClick(){
    this.props.updateJamScreenInList(this.state.jamCode);
  };

  render() {
    return (

      <button className="jam-container" onClick={this.onJamClick}>

        <div className="jams-list-content">
          <h4>{this.state.jamName}</h4>
        </div>

        <div className="jams-list-content">
          <p>{this.state.Description}</p>
        </div>

      </button>
    )
  }
}