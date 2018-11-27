import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './index.css';

export default class JammerProfile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        users : this.props,
    }

    console.log("State en Jammers", this.state.users)
    console.log("Props en Jammers", this.state.props)

  }


  



    render() {
            
        return (
            
            <div className="user-container">

                <div className="user-header">

                    <div className="user-header-left">
                        <div className="user-pic">
                            <img src={user.image_url}/>
                        </div>
                    </div>

                    <div className="user-header-right">
                        <div className="user-name">
                            <h4>{this.props.user.name}</h4>
                            <h4>{this.props.user.surnames}</h4>
                        </div>
                        <h6>{this.props.user.country}</h6>
                    </div>

                </div>

                <div className="user-info-profile">                
                    <p>{this.props.user.studies}</p>
                    <p>{this.props.user.school}</p>  
                    <p>AGE</p>       
                </div>

                <div className="user-board">

                    <div className="user-chat-content">


                    </div>


                    <div className="user-send-area">

                        <input type="textarea" 
                            placeholder="Message"
                            value={this.state.messageText}
                            onChange={this.onChangeMessage}
                        />

                        <button onClick={this.newMessage}>Send</button>
                    </div>

                </div>

  
            </div>

        )

    };
  
}


