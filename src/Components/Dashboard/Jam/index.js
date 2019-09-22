import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import Board from './JamNavBar/Board';
import FlatMates from './FlatMates'
import MyJam from './JamNavBar/MyJam';
import Settings from './JamNavBar/Settings';

// import DataService from '../../services/DataService';
import { getJamInfoById } from '../../../redux/actions/jamsInfo';

import './index.css';

const Jam = ( props ) => {
  const [ jamActive, setJamActive ] = useState(props.jamActive);
  const  [jamSection, setJamSection]  = useState(props.jamSection);
  
  useEffect(() => {
    setJamActive(props.jamId);
  }, [props.jamId])

  useEffect(() => {
    setJamSection(props.jamSection);
  }, [props.jamSection])
  
  console.log('props en JAM =', props)
  return (
    <div>

      {jamActive === undefined ? <h1>SELECT YOUR JAM</h1> : 
      
        <div className="jam-container">
          { jamSection === 'board' && 
            <Board jamId={jamActive}/>
          }

          { jamSection === 'jammers' && 
            <FlatMates jamId={jamActive}/>
          }

          { jamSection === 'myJam' && 
            <MyJam jamId={jamActive}/>
          }

          { jamSection === 'settings' && 
            <Settings jamId={jamActive}/>
          } 

        </div>
      }
    </div>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
      // nombre de la función que paso como prop: (arg) => dispatch(nombre del action creator(argumento))
      getJamInfoById: (jamId) => dispatch(getJamInfoById(jamId))
  }
}

const mapStateToProps = state => {
  console.log('stat ene el jam = ', state)
  return { 
      jamSection: state.jamSection,
      jams: state.jams,
      auth: state.firebase.auth,
      jamActive: state.jamACtive

   }
};

export default connect(mapStateToProps, mapDispatchToProps) (Jam);






