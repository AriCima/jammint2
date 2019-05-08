import React from 'react';

// SERVICE API
import NewJam from '../../Components/NewJam';
import JoinJam from '../Jam/JoinJam';

import './index.css'; 



export default class NewJoinJam extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            userId      : this.props.userID,
        };

        this._onNewJam  =  this._onNewJam.bind(this)
        this._onJoinJam =  this._onJoinJam.bind(this)
    }

    _onNewJam(x){
        this.props.propsFn.push(`/jam/${x}`);
    }

    _onJoinJam(x){
        console.log('el X en el joinJam = ', x)
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

