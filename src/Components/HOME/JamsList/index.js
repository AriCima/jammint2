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
      jamId: '',
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

  updateJamScreenList(jamCode, jamId){
    console.log('update en el JamsList via props')

    this.setState({
      jamCode: jamCode,
    })
    this.props.updateJamScreenInHome(jamCode, jamId);
  };

  _renderJams() {
    let jams = this.state.userJams;

    return jams.map((jam, j) => {
      return (
        <div className="jamCover-wrapper" key={j}>
          <JamCover 
            updateJamScreenInList={this.updateJamScreenList} 
            name={jam.jamName} 
            desc={jam.jamDescription}
            code={jam.jamCode}
            jamId={jam.jamId}
            />
        </div>
      )
    });
  };



  render() {
    // console.log('userJams en el render del LIST', this.state.userJams)
    return (
    <div className="jams-list-wrapper">
      {this.state.userJams === [] ? <p>loading </p>: 
      this._renderJams()}
    </div>
    )
  }
}
