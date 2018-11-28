import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';
import NewJam from '../NewJam';
import JoinJam from '../JoinJam';

// MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import './index.css'; 



export default class NewJoinJam extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            userId      : this.props.userID,
        };

    }


  
  render() {
    const {props} = this.props;
    return (

        <div className="container">
        <Router>
            <div className="new-jam">
                <NewJam userID={this.state.userId} propsFn={props.history}/>
            </div>

            <div className="new-jam">
                <JoinJam userID={this.state.userId} propsFn={props.history}/>
            </div>
           
        </Router>
        </div>
    );
  }
}

