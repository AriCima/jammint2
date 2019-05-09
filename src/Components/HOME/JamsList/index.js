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
      jamScreen: '',
    };
    // console.log('state del JamsList = ', this.state)
  };
  componentDidUpdate(prevProps, prevState){
    // console.log('CDU launched', this.props.userJams, ' / ', prevProps.userJams);
    if(this.props.userJams !== prevProps.userJams){
        this.setState({
            userJams: this.props.userJams
        })
        // console.log('state after CDU = ', this.state)
    }

  };
  _renderJams() {
    let jams = this.state.userJams;

    return jams.map((jam, j) => {
      return (
        <JamCover updateJamScreenList={this.state.updateJamScreen} name={jam.jamName} desc={jam.jamDescription}/>
      )
    });
  }

  updateJamScreenList(x){
    this.setState({
      jamScreen: x
    })
    this.props.updateJamScreenHome();
  }

  render() {
    // console.log('userJams en el render del LIST', this.state.userJams)
    return (
    <div className="myjams">
      {this.state.userJams === [] ? <p>loading </p>: this._renderJams()}
    </div>
    )
  }
}
