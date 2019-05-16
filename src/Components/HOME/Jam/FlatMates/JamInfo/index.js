import React, { Component } from 'react';

import './index.css';

export default class JamInfo extends Component {
  constructor(props){
    super(props);

    this.state = {
      jamId           : this.props.jamId,
      userIsAdmin     : this.props.admin,
      userId          : this.props.userId,
      messagesInBoard : [],
    };

  };


  componentDidUpdate(prevProps, prevState){
    if(this.props.jamId !== prevProps.jamId){
      this.setState({
          jamId: this.props.jamId
      })
    };

    if(this.props.admin !== prevProps.admin){
      this.setState({
        userIsAdmin: this.props.admin
      })
    };
  };


  render() {
    console.log('Am I the Jam Admin ?: ', this.state.userIsAdmin);
    let text ='';

    if(this.state.userIsAdmin){
      text = 'true';
    } else {
      text = 'false';
    };

    return (

      <div className="jam-info">

        <div className="jam-Info-content" id="jam-content">
         
          <p>THIS IS JAM: {this.state.jamId}</p>
          <p>Am I the Jam Admin : {text}</p>

        </div>

      </div>
      

    );
  }
}






