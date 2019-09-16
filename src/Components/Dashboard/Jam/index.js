import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import JamNavBar from './JamNavBar';
import Board from './JamNavBar/Board';
import FlatMates from './FlatMates'
import MyJam from './JamNavBar/MyJam';
import Settings from './JamNavBar/Settings';
import { getJamInfoById } from '../../../redux/actions/jamsInfo';

import './index.css';

const Jam = ( props ) => {

  const [jamId, setJamId] = useState(props.jamId);
  const [jamSection, setJamSection] = useState(props.jamSection);


  useEffect(() => {
   
  },[jamSection]);

  return (
    <div>
      <div className="jamNavBar">
        <JamNavBar 
          jamId={jamId} 
          jamSection={jamSection}
        />
      </div>

      {jamId === undefined ? <h1>SELECT YOUR JAM</h1> : 
      
        <div className="jam-container">
          { jamSection === 'board' && 
            <Board 
              userId={this.state.userId}
              jamId={this.state.jamId}
            />
          }

          { jamSection === 'flatmates' && 
            <FlatMates
              userId={this.state.userId} 
              jamId={this.state.jamId}
              jammers={this.state.jammers}
            />
          }

          { jamSection === 'myjam' && 
            <MyJam
              userId={this.state.userId} 
              jamId={this.state.jamId}
            />
          }

          { jamSection === 'settings' && 
            <Settings
              userId={this.state.userId} 
              jamId={this.state.jamId}
            />
          } 

        </div>
      }
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
      // nombre de la función que paso como prop: (arg) => dispatch(nombre del action creator(argumento))
      getJamInfo: (jamId) => dispatch(getJamInfoById(jamId))
  }
}

const mapStateToProps = state => {
  console.log('state del jam =', state)
  return { 
      jamId: state.jams,
      jamSection: state.jamSection,
      auth: state.firebase.auth
   }
};

export default connect(mapStateToProps) (Jam);






