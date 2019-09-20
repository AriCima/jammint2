import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import Board from './JamNavBar/Board';
import FlatMates from './FlatMates'
import MyJam from './JamNavBar/MyJam';
import Settings from './JamNavBar/Settings';

import './index.css';

const Jam = ( props ) => {

  const { jamSection, jamId } = props;

  return (
    <div>

      {jamId === undefined ? <h1>SELECT YOUR JAM</h1> : 
      
        <div className="jam-container">
          { jamSection === 'board' && 
            <Board />
          }

          { jamSection === 'flatmates' && 
            <FlatMates/>
          }

          { jamSection === 'myjam' && 
            <MyJam />
          }

          { jamSection === 'settings' && 
            <Settings />
          } 

        </div>
      }
    </div>
  );
};

const mapStateToProps = state => {
  console.log('state del jam =', state)
  return { 
      jamId: state.jams,
      jamSection: state.jamSection,
      auth: state.firebase.auth
   }
};

export default connect(mapStateToProps) (Jam);






