import React from 'react';

// SERVICE API
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

        this._onNewJam =  this._onNewJam.bind(this)
    }

    _onNewJam(x){
        this.props.propsFn.push(`/jam/${x}`);
    }

    _onJoinJam(x){
        this.props.propsFn.push(`/jam/${x}`);
    }
  
  render() {
    
    return (

        <div className="container">
        
            <div className="new-jam">
                <NewJam userID={this.state.userId} newJam={this._onNewJam}/>
            </div>

            <div className="new-jam">
                <JoinJam userID={this.state.userId} joinJam={this._onJoinJam}/>
            </div>
           
        
        </div>
    );
  }
}

