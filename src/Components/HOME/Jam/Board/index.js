import React, { Component } from 'react';

import './index.css';

export default class Board extends Component {
  constructor(props){
    super(props);

    this.state = {
      jamId           : this.props.jamID,
      userId: this.props.userId,
    };
  };

  componentDidUpdate(prevProps, prevState){

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

    return (

      <div className="board">

        <div className="board-content" id="board-content">
         
          <p>THIS IS THE BOARD : {this.state.jamId} </p>

        </div>

      </div>
      

    );
  }
}






