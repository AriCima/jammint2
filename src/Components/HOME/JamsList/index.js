import React, {Component}from "react";

// COMPONENTS
import JamCover from './JamCover'


// CSS
import "./index.css";

export default class JamsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userJams: this.props.userJams,
      jamCode: '',
    };

    this.updateJamScreenList = this.updateJamScreenList.bind(this);
  };

  componentDidUpdate(prevProps, prevState){
    if(this.props.userJams !== prevProps.userJams){
      this.setState({
        userJams: this.props.userJams
      })
    };
  };

  _renderJams() {
    let jams = this.state.userJams;

    return jams.map((jam, j) => {
      return (
        <div className="myjams" key={j}>
          <JamCover updateJamScreenList={this.state.updateJamScreen} name={jam.jamName} desc={jam.jamDescription}/>
        </div>
      )
    });
  }

  updateJamScreenList(x){
    this.setState({
      jamCode: x
    })
    this.props.updateJamScreenHome(x);
  }

  render() {
    // console.log('userJams en el render del LIST', this.state.userJams)
    return (
    <div>
      {this.state.userJams === [] ? <p>loading </p>: this._renderJams()}
    </div>
    )
  }
}
