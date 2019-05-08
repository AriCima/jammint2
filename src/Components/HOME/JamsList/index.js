import React from "react";

// SERVICE API
import DataService from "../../services/DataService";

// CSS
import "./index.css";

export default class JamsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userID,
      userName: "",
      userJams: [],
      userChats: []
    };

    this.onJamClick = this.onJamClick.bind(this);
  }

  componentDidMount() {
    DataService.getUserInfo(this.props.userID)
    .then(result => {
      let userJams = result.userJams;

      this.setState({
        userJams: userJams
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  onJamClick(x){
    console.log('clicked on: ',x)
  };

  _renderJams() {
    let jams = this.state.userJams;

    return jams.map((jam, j) => {
      let name = jam.jamName;
      return (
        <button className="jam-container" key={j} onClick={this.onJamClick(name)}>
          <div className="jams-list-content">
            <h4>{jam.jamName}</h4>
          </div>

          <div className="jams-list-content">
            <p>{jam.jamId}</p>
          </div>
        </button>
      );
    });
  }

  render() {
    return <div className="myjams">{this._renderJams()}</div>;
  }
}
