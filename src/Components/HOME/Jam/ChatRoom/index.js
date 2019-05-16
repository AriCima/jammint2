import React, { Component } from 'react';

import './index.css';

export default class ChatRoom extends Component {
  constructor(props){
    super(props);

    this.state = {
      jamId   : this.props.jamId,
      userId  : this.props.userId,
    };
  };

  componentDidUpdate(prevProps, prevState){
    console.log('CDU del Board launched ')
    if(this.props.jamId !== prevProps.jamId){
      this.setState({
        jamId: this.props.jamId
      });
    };

    if(this.props.admin !== prevProps.admin){
      this.setState({
        userIsAdmin: this.props.admin
      });
    };
  };


  render() {
    console.log('props received en Board ', this.props)
    return (

      <div className="board">

        <div className="board-content" id="board-content">
         
          <p>THIS IS THE CHAT : {this.state.jamId} </p>

        </div>

      </div>

    );
  }
}






